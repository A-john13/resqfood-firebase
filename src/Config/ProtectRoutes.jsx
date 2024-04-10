import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from './firebase'

const ProtectRoutes = ( {children} ) => {
    const {user,UID,userRole} = useFirebase();
    //userRole

    if(!user){
        return <Navigate to="/" />
    }
  return children;
}

export default ProtectRoutes
