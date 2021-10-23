import React, { useContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';
const AuthStateContext = React.createContext();
const AuthDispatcherContext = React.createContext();

// Custom Hook : (قبل از اجرای اینها AuthProvider باید اجرا شود)
// استفاده برای کامپوننت هایی که میخواهند به   context وصل شوند
export function useAuthState() {
    const context = useContext(AuthStateContext);
    // این شرط چک میشود چون مقدار اولیه در خط 4 خالی است و   undifind برمیگرداند
    if (!context) {
        throw Error("useAuthState must be used with AuthProvider");
    }
    return context;
}

export function useAuthDispatch() {
    const context = useContext(AuthDispatcherContext);
    if (!context) {
        throw Error("useAuthDispatch must be used with AuthProvider");
    }
    return context;
}


export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer( reducer, initialState);

    return (
        <AuthStateContext.Provider value={state} >
            <AuthDispatcherContext.Provider value={dispatch}>
                 { children }
            </AuthDispatcherContext.Provider>
        </AuthStateContext.Provider>
    )

}
