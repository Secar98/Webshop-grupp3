import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/userContext';

import { FaUser } from 'react-icons/fa';
import OrderItem from '../components/OrderItem';

export default function UserProfilePage() {
    const url = 'http://localhost:3000/api/orders'
    const[orders,setOrders] = useState(null)
    const[showProfile,setShowProfile] = useState(true)
    const[showOrders,setShowOrders] = useState(false)

    const {user,setUser} = useContext(UserContext);
    console.log(user)
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
const getUser =  ()=>{ 
    const url = 'http://localhost:3000/api/users/'
    const token=localStorage.getItem("token")
    if(token){
    fetch(url,{
              method: "GET",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization": token
              }
          })
          .then(res=>res.json())
          .then(data=> {
              setUser(data)
              console.log(data)
          })
          .then(()=>console.log(user))
        }
      }

    const handleProfile = ()=>{
        setShowProfile (true)
        setShowOrders (false)
    }
    const handleOrder = ()=>{
        setShowProfile (false)
        setShowOrders (true)
    }


    // Get user data- check if a user is present fetch data from /api/user here or get it from the context if saved there
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
                                <th>Fullname</th>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <th>{user.email}</th>
                            </tr>
                            <tr>
                                <td>Delivery adress</td>
                                <th>Test adress</th>
                            </tr>               
                            <tr>
                                <td>Phone number</td>
                                <th>Test phone</th>
                            </tr>               
                        </tbody>
                    </table>
                </div>
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