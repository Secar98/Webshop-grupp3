import React,{ useState } from 'react'
import FetchKit from '../utils/fetchKit';

export default function Form({fullName,email,phoneNumber, deliveryAddress}) {
        const [formData, setFormData] = useState({
        email, 
        fullName,
        phoneNumber,
        deliveryAddress
    })

    const handleOnSubmit =  (e) =>{
        const token = localStorage.getItem('token')
        e.preventDefault()
        FetchKit.editFetch(formData,token)
        .then((res) => res.json())
        .then(item =>{
            console.log(item)
        });
    }

    const handleOnChange = (e) => {
        if((e.target.name === 'streetAddress') || (e.target.name === 'city') || (e.target.name === 'postalCode')  ){
            setFormData({ ...formData,deliveryAddress:{...deliveryAddress,[e.target.name]: e.target.value}})
        }
        // if(e.target.name === 'streetAddress') {
        //     setFormData({ ...formData,deliveryAddress:{...deliveryAddress,streetAddress: e.target.value}})

        // }
        // if(e.target.name === 'city') {
        //     setFormData({ ...formData,deliveryAddress:{...deliveryAddress,city: e.target.value}})
            
        // }
        // if (e.target.name === 'postalCode') {
        //     setFormData({ ...formData,deliveryAddress:{...deliveryAddress,postalCode: e.target.value}})
        // }
        else
        {
            setFormData({ ...formData, [e.target.name]: e.target.value})
        }
        console.log(formData)
    }
    return (
        <div>
    <form method="POST" onSubmit={handleOnSubmit}>
        <input name="fullName" onChange={handleOnChange} type="text" defaultValue={fullName}/>
        <input name="email" onChange={handleOnChange} type="text" defaultValue={email} />
        <input name="phoneNumber" onChange={handleOnChange} type="number" defaultValue={phoneNumber} />
        <input name="streetAddress" onChange={handleOnChange} type="text" defaultValue={deliveryAddress.streetAddress} />
        <input name="city" onChange={handleOnChange} type="text" defaultValue={deliveryAddress.city}/>
        <input name="postalCode" onChange={handleOnChange} type="number" defaultValue={deliveryAddress.postalCode}/>
        <input type="submit" value="submit"/>
    </form>
</div>
    )
}

