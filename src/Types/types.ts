import { User } from "firebase/auth";

export type AppContextType = {
    currentUser: User | null
    username: string;
    password: string;
    email: string;
    dispatch: React.Dispatch<AppActionType>;
    signUpError: string;
    
}

export type AppActionType = {
    type: string;
    payload? : {
        currentUserPayload?: User | null;
        signUpErrorPayload? : string;
        signUps?: {
            usernamePayload?: string;
            passwordPayload?: string
            emailPayload?: string
        }
    }
}