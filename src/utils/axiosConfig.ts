import axios from 'axios';

// Crée une instance Axios avec la configuration de base
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Remplacez par l'URL de votre API
  withCredentials: true, // Permet l'envoi des cookies avec chaque requête
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Ajoute un intercepteur de requête (facultatif)
axiosInstance.interceptors.request.use(
  (config) => {
    // Vous pouvez ajouter une logique ici, par exemple pour ajouter des en-têtes
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajoute un intercepteur de réponse pour gérer les erreurs (facultatif)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gère les erreurs globales comme les 401 ou 403
    // if (error.response?.status === 401) {
    //   console.error('Non autorisé. Redirection vers la page de connexion.');
    //   // Vous pouvez rediriger l'utilisateur ou effectuer une autre action ici
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
