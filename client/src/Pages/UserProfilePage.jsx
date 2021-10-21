import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/userContext';
import { FaUser } from 'react-icons/fa';
import OrderItem from '../components/OrderItem';
import Form from '../components/Form';

export default function UserProfilePage() {
    const url = 'http://localhost:3000/api/orders'
    const[orders,setOrders] = useState(null)
    const[showOrders,setShowOrders] = useState(false)
    
    const {user,setUser,showEdit, setShowEdit,showProfile,setShowProfile,getUser} = useContext(UserContext);
    
    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(token){
              fetch(url,{                
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
              })
              .then(res => res.json())
              .then(data => {
                setOrders(data)
                console.log(data)
              })
            }
            getUser()
    },[])

    const handleProfile = ()=>{
        setShowProfile (true)
        setShowOrders (false)
        setShowEdit(false)
    }
    const handleOrder = ()=>{
        setShowProfile (false)
        setShowOrders (true)
        setShowEdit(false)
    }
    const handleEdit = ()=>{
        setShowProfile (false)
        setShowEdit(true)
        setShowOrders (false)
    }
    return (
        <div className="row">
            
            <div className="col-md-3 border rounded">
                <div>
                    <FaUser style={{fontSize: '7rem'}} />
                    <h2>Name</h2>
                </div>
                <div>
                <h4 onClick={handleProfile}>My profile</h4>      
                <h4 onClick={handleOrder}>My Orders</h4>      
                </div>
            </div>
            {(showProfile && user) &&
                <div className="col-md-8 border rounded m-3">
                    <h1>My Profile</h1>      
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <th>{user.fullName}</th>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <th>{user.email}</th>
                            </tr>
                            <tr >
                                <td >Delivery adress</td>
                                <th>
                                    {user.deliveryAddress.streetAddress},
                                    {user.deliveryAddress.city},
                                    {user.deliveryAddress.postalCode}
                                
                                </th>
                            </tr>               
                            <tr>
                                <td>Phone number</td>
                                <th>{user.phoneNumber}</th>
                            </tr>               
                        </tbody>
                    </table>
                    <button onClick ={handleEdit}>Edit</button>
                </div>
            }
            {(showEdit && user) &&
                <Form {...user}/>
            }
            {(showOrders && orders) &&
                <div className="col-md-8 border rounded m-3">
                    <h1>My Orders</h1> 
                    {orders.map (order =>{
                        return(
                            <>
                                <OrderItem key ={order._id} {...order}/>
                            </>
                            )

                        })}
                    </div>
                    
            }
            
        </div>
    )
}
