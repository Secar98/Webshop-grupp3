import React from 'react'
import {Route, useHistory} from "react-router-dom"
import Auth from '../utils/auth'

export default function ProtectedRoutes (component) {
    
    const getToken = localStorage.getItem("token")
    const history = useHistory()
    
    Auth.authenticateToken(getToken)
    .then(item => {
        if(!item){
            console.log(item)
            history.push("/")
        }
    })
    
    return (
            <Route {...component}/>
    )                               

    
}