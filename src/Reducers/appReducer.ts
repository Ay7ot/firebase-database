import { AppActionType, AppContextType } from "../Types/types";

export function appReducer(state: AppContextType, action: AppActionType): AppContextType{
    switch(action.type){
        case 'setCurrentUser' :
            return {
                ...state,
                currentUser: action.payload?.currentUserPayload ?? null
            }
        case 'setSignUpError':
            return {
                ...state,
                signUpError: action.payload?.signUpErrorPayload ?? ''
            }
        case 'setEmail':
            return {
                ...state,
                email: action.payload?.signUps?.emailPayload ?? ''
            }
        case 'setPassword':
            return {
                ...state,
                password: action.payload?.signUps?.passwordPayload ?? ''
            }
        case 'setUsername':
            return {
                ...state,
                username: action.payload?.signUps?.usernamePayload ?? ''
            }
        default :
            return {
                ...state
            } 
        
    }
}