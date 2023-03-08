import { User } from "firebase/auth";

export type AppContextType = {
    currentUser: User | null
    username: string;
    password: string;
    email: string;
    dispatch: React.Dispatch<AppActionType>;
    signUpError: string;
    todo: todoType;
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
        todoPayload?: {
            name?: string,
            isComplete?: boolean,
            id?: string
        };
        todosPayload?: todoType[];
    }  
}

export type todoType = {
    name: string;
    id?: string;
    isComplete?: boolean;
}