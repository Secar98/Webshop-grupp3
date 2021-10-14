import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import FetchKit from '../utils/fetchKit';
import {UserContext} from '../context/userContext';

export default function RegisterPage() {
    const history = useHistory();
    const {setNewUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "", 
        password:"" 
    })


    const handleOnSubmit =  (e) =>{
        e.preventDefault()

        FetchKit.registerFetch(formData)
        .then((res) => res.json())
        .then(item =>{
            setNewUser(true);
            history.push('/login')
        });

    }

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

  return (
    <div>
    <form method="POST" onSubmit={handleOnSubmit}>
        <input name="email" onChange={handleOnChange} type="text"placeholder="email"/>
        <input name="password" onChange={handleOnChange} type="password" placeholder="password"/>
        <input type="submit" value="register"/>
    </form>
</div>
  );
}
