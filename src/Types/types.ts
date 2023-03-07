import { User } from "firebase/auth";

export type AppContextType = {
    currentUser: User | null
    username: string;
    password: string;
    email: string;
    dispatch: React.Dispatch<AppActionType>;
    signUpError: string;
    todo: string;
    todos: todoType[]
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
        todoPayload?: string;
    }  
}

export type todoType = {
    name: string;
    id: string;
    isComplete: boolean;
}