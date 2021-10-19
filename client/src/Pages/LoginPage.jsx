import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import FetchKit from '../utils/fetchKit'
import {UserContext} from '../context/userContext';
import Navigation from '../components/Navigation';

export default function LoginPage() {
    const history = useHistory();
    const {setNewUser, newUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "", 
        password:"" 
    })

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token && token !== "undefined"){
            history.push('/homPage')
        }
    },[])

    const handleOnSubmit = (e) =>{
        e.preventDefault()

        FetchKit.loginFetch(formData)
        .then((res) => res.json())
        .then(item =>{
            localStorage.setItem("token", item.token)
            history.push('/homePage')
        })    

    }

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    return (
      <>
        <Navigation />
        <div>
            <form method="POST" onSubmit={handleOnSubmit}>
                <input name="email" onChange={handleOnChange} type="text"placeholder="email"/>
                <input name="password" onChange={handleOnChange} type="password" placeholder="password"/>
                <input type="submit" value="login"/>
            </form>
            {newUser && <p>Ny användare</p>}
        </div>
      </>
    )
}
