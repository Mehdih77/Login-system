import React, { useState }from 'react';
import Form from './Form';
import AuthContext from '../auth-context';

export default function Main() {

    const [userrr , setUser] = useState({ idd: 22})

    return (
        <AuthContext.Provider value={userrr} >
            <Form />
        </AuthContext.Provider>
    )
}
