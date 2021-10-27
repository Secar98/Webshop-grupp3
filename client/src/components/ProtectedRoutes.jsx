import React,{useState, useEffect} from 'react'
import {Route, useHistory} from "react-router-dom"
import Auth from '../utils/auth'

export default function ProtectedRoutes(component) {
    const [isLoading, setIsLoading] = useState(false);
    const getToken = localStorage.getItem("token")
    const history = useHistory()

    useEffect(() => {
        authenticated();
    }, [])

    const authenticated = () => {
        Auth.authenticateToken(getToken)
            .then(item => {
                setIsLoading(item[0]);
                if(!item[0]) {
                    console.log(item[1])
                    history.push("/")
                }})
    }
        
    return (
            isLoading ? <Route {...component} /> :  <>Loading...</>
    )                               
    
}