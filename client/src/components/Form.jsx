import React, {useContext} from 'react'
import FetchKit from '../utils/fetchKit';
import {UserContext} from '../context/userContext';
import Button from 'react-bootstrap/Button';

export default function Form({_id,fullName,email,phoneNumber, deliveryAddress}) {

    const {setShowEdit,setShowProfile,setUser,getUser} = useContext(UserContext);

    const handleOnSubmit =  async (e) =>{
        e.preventDefault()
        setShowEdit(false)
        const newData ={
            fullName: e.target[0].value,
            email: e.target[1].value,
            phoneNumber: e.target[2].value,
            deliveryAddress: {
                postalCode: e.target[3].value,
                streetAddress: e.target[4].value,
                city: e.target[5].value,
            },
        };
        setShowProfile(true)
        const token = localStorage.getItem('token')
        FetchKit.editFetch(newData,token,_id)
        .then((res) => res.json())
        .then(item =>{
            getUser()
        });
        
    }

    return (
        <div>
            <h2>My Profile</h2>
            <form method="POST" onSubmit={handleOnSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <th>
                                <input name="fullName" type="text" defaultValue={fullName}/>
                            </th>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <th>
                                <input name="email" type="text" defaultValue={email} />
                            </th>
                        </tr>
                        <tr>
                            <td>Phone number</td>
                            <th>
                <input name="phoneNumber" type="number" defaultValue={phoneNumber} />
                            </th>
                        </tr>
                        <tr>
                            <td>Postal code</td>
                            <th>
                <input name="postalCode" type="number" defaultValue={deliveryAddress.postalCode}/>
                            </th>
                        </tr>
                        <tr>
                            <td>Street address</td>
                            <th>
                <input name="streetAddress" type="text" defaultValue={deliveryAddress.streetAddress} />
                            </th>
                        </tr>
                        <tr>
                            <td>City</td>
                            <th>
                <input name="city" type="text" defaultValue={deliveryAddress.city}/>
                            </th>
                        </tr>
                        
                    </tbody>
                </table>
                <input className="btn lightText m-3" type="submit" value="Submit"/>
            </form>
        </div>
    )
}
