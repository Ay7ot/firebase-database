import { useContext, useState, useReducer, createContext, ReactNode, useEffect } from "react";
import { auth } from "../firebase";
import { appReducer } from "../Reducers/appReducer";
import { AppContextType } from "../Types/types";

const AppContext = createContext<AppContextType>({
    currentUser: null,
    username: '',
    password: '',
    email: '',
    dispatch: () => {},
    signUpError: '',
    todo: {
        name: '',
        id: '',
        isComplete: false
    },
    todos: []
})

export const useAuth = () => {
    return useContext(AppContext)
}


export const AppProvider = ({children}: {children: ReactNode}) => {
    
    const value = useAuth()
    const [mainState, dispatch] = useReducer(appReducer, value)
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const unSubscribe = auth.onAuthStateChanged(user => {
            dispatch({
                type: 'setCurrentUser',
                payload: {
                    currentUserPayload: user
                }
            })
            setLoading(false)
            
        })
        
        return unSubscribe
    },[])
    
    return (
        <AppContext.Provider value={{...mainState, dispatch}}>
            {!loading && children}
        </AppContext.Provider>
    )
}