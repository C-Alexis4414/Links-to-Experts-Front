export type FormValues={
    user?: UserFields | null
}

export type UserFields = {
    id: number
    userName: string | undefined;
    email: string  | undefined;
    password: string  | undefined;
    is_Youtuber: boolean ;
    tagChannel?: string ;
    is_Professional: boolean ;
    urlLinkedin?: string  ;
    followersCount: number ;
    subscriptionsCount: number ;
    likes: { id: number; name: string }[];
}