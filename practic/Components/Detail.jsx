import React, { useContext } from 'react'
import AuthContext from '../auth-context';

export default function Detail() {

    const userr = useContext(AuthContext);

    return (
       <p> My ID is: {userr.idd}   </p>
    )
}
