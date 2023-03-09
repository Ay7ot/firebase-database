import { AppActionType, AppContextType } from "../Types/types";

export function appReducer(state: AppContextType, action: AppActionType): AppContextType{
    switch(action.type){
        case 'setCurrentUser' :
            return {
                ...state,
                currentUser: action.payload?.currentUserPayload ?? null
            }
        case 'setNoUser':
            return {
                ...state,
                currentUser: null
            }
        case 'setNoParameter':
            return {
                ...state,
                email: '',
                password: '',
                username: '',
                signUpError: ''
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
        case 'setTodo':
            return {
                ...state,
                todo: {
                    isComplete: false,
                    name: action.payload?.todoPayload?.name ?? '',
                    id: action.payload?.todoPayload?.id ?? ''
                }
            }
        case 'setNoTodoName':{
            return {
                ...state, 
                todo: {
                    name: ''
                }
            }
        }
        case 'setNoTodos':
            return {
                ...state,
                todos: []
            }
        case 'setTodos':
            return {
                ...state,
                todos: action.payload?.todosPayload ?? []
            }
        case 'setTodoError':
            return {
                ...state,
                todoError: action.payload?.todoErrorPayload ?? ''
            }
        default :
            return {
                ...state
            } 
        
    }
}