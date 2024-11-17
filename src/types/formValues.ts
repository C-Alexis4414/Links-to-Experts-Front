export type FormValues={
    user: UserFields
}

export type UserFields = {
    userName: string | undefined;
    email: string  | undefined;
    password: string  | undefined;
    is_Youtuber: boolean ;
    tagChannel?: string ;
    is_Professional: boolean ;
    urlLinkedin?: string  ;
}