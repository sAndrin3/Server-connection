import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

//initial state

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
}

//create context 

export const Context = createContext(INITIAL_STATE);

//provider component

export const ContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    let USER 
    
    useEffect(()=>{
        USER = localStorage.getItem("user")

    }, [])

    return (
        <Context.Provider value={{user: state.user, dispatch, USER}}>
            {children}
        </Context.Provider>
    )
}
