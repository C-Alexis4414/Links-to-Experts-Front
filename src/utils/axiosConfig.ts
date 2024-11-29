import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    isRetry?: boolean;
    retryCount?: number;
    maxRetries?: number;
  }
}

// Crée une instance Axios avec la configuration de base
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Remplacez par l'URL de votre API
  withCredentials: true, // Permet l'envoi des cookies avec chaque requête
});



// Fonction pour rafraîchir le token
const refreshToken = async (): Promise<void> => {
  try {
    // Envoie une requête POST à l'endpoint '/authentication/refresh'
    // pour tenter d'obtenir un nouveau token d'authentification.
    await axiosInstance.post('/authentication/refresh');
  } catch (error) {
    // Si une erreur survient (par exemple, si le token n'a pas pu être rafraîchi),
    // on vérifie si le code est exécuté dans un environnement navigateur (window existe).
    if (typeof window !== 'undefined') {
      // Récupère l'URL actuelle de la page (chemin, ex. '/login ou /homePage').
      const currentUrl = window.location.pathname;
      if (currentUrl === '/login' || currentUrl === '/register' || currentUrl === '/test') {
        throw error; // Si on est déjà sur la page de login ou register, on ne redirige pas.
      }

      // Encode l'URL actuelle :
      // 1. encodeURIComponent : Encode les caractères spéciaux dans l'URL (ex. espaces, accents).
      // 2. btoa : Convertit l'URL encodée en base64 pour la rendre plus sûre à transmettre.
      const encodedUrl = btoa(encodeURIComponent(currentUrl));

      // Redirige l'utilisateur vers la page de login, en ajoutant un paramètre `redirect`
      // contenant l'URL de la page actuelle. Cela permet de rediriger l'utilisateur
      // vers la bonne page après s'être connecté.
      window.location.href = `/login?redirect=${encodedUrl}`;
    }
    // Propage l'erreur afin qu'elle puisse être gérée ailleurs.
    throw error;
  }
};

// Liste des endpoints exclus pour certaines logiques
const excludedEndpoints: string[] = ['/authentication/refresh', '/authentication/login', '/authentication/signUp']; // potentiellement les routes de reset de password

// Détecte une erreur réseau
const isNetworkError = (error: AxiosError): boolean => {
  return !error.response && Boolean(error.isAxiosError);
};

// Calcule la durée du délai entre les tentatives
const getDelayDuration = (retryCount: number): number => {
  // Délai exponentiel : 1s, 2s, 4s, 8s, 16s...
  return Math.min(1000 * 2 ** retryCount, 30000);
};

// Ajoute un intercepteur de réponse pour gérer les erreurs
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, // Retourne la réponse en cas de succès
  async (error: AxiosError) => {
    const originalRequest: AxiosRequestConfig | undefined = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Gestion des erreurs réseau avec tentatives
    // if (isNetworkError(error)) {
    //   originalRequest.retryCount = (originalRequest.retryCount || 0) + 1;
    //   originalRequest.maxRetries = originalRequest.maxRetries || 10; // Nombre maximum de tentatives

    //   if (originalRequest.retryCount <= originalRequest.maxRetries) {
    //     const delayTime = getDelayDuration(originalRequest.retryCount - 1);

    //     await new Promise((resolve) => setTimeout(resolve, delayTime));
    //     return axiosInstance(originalRequest);
    //   }
    // }

    // Gestion des erreurs 401 pour rafraîchir le token
    if (
      error.response?.status === 401 &&
      !originalRequest.isRetry &&
      !excludedEndpoints.some((url) => originalRequest.url?.endsWith(url))
    ) {
      originalRequest.isRetry = true;
      try {
        console.log('appel route de refreshToken');
        
        await refreshToken();
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Si aucune des conditions n'est remplie, rejette l'erreur
    return Promise.reject(error);
  }
);

export default axiosInstance;
