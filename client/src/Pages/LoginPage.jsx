import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import FetchKit from '../utils/fetchKit'

export default function LoginPage() {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "", 
        password:"" 
    })

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            history.push('/homPage')
        }
    },[])

    const handleOnSubmit =  (e) =>{
        e.preventDefault()

        FetchKit.postFetch(formData)
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
        <div>
            <form method="POST" onSubmit={handleOnSubmit}>
                <input name="email" onChange={handleOnChange} type="text"placeholder="email"/>
                <input name="password" onChange={handleOnChange} type="password" placeholder="password"/>
                <input type="submit" value="login"/>
            </form>
        </div>
    )
}
