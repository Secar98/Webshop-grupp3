import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/userContext';
import { FaUser } from 'react-icons/fa';
import OrderItem from '../components/OrderItem';
import Form from '../components/Form';
import FetchKit from '../utils/fetchKit';
import Navigation from '../components/Navigation';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function UserProfilePage() {
    const[orders,setOrders] = useState(null)
    const[showOrders,setShowOrders] = useState(false)
    
    const {user,setUser,showEdit, setShowEdit,showProfile,setShowProfile,getUser} = useContext(UserContext);

    useEffect(()=>{
        getOrders()
        getUser()
    },[])

    const getOrders = ()=>{ 
    const token=localStorage.getItem("token")
    if(token){
      FetchKit.FetchOrders(token)
            .then(res => res.json())
              .then(data => {
                setOrders(data)
                console.log(data)
              })
            }
    }

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
      <>
        <Navigation />
        <div className="row">
          <div className="col-md-3 m-3 colorBackground lightText shadow">
            <div className="center">
                <div className="profilePic p-3 m-3">    
                    <FaUser style={{ fontSize: "7rem" }} />
                </div>
                {user &&
                    <h2>Name: {user.fullName}</h2>
                }
            </div>
            <div className="profileItems p-3">
              <Button onClick={handleProfile}>My profile</Button>
              <Button onClick={handleOrder}>My Orders</Button>
            </div>
          </div>
            <Card className="col-md-8 p-3 m-3 shadow">
          {showProfile && user && (
              <>
              <Card.Title>My Profile</Card.Title>
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
                  <tr>
                    <td>Phone number</td>
                    <th>{user.phoneNumber}</th>
                  </tr>
                  <tr>
                    <td className="align-text-top">Delivery adress</td>
                    <th>
                      {user.deliveryAddress.streetAddress} <br />
                      {user.deliveryAddress.city} <br />
                      {user.deliveryAddress.postalCode}
                    </th>
                  </tr>
                </tbody>
              </table>
              <Button className="editBtn m-3" onClick={handleEdit}>Edit</Button>
              </>
          )}
          {showEdit && user && <Form {...user} />}
          
          {showOrders && orders && (
              <>
              <Card.Title>My Orders</Card.Title>
              {orders.map((order) => {
                return (
                  <>
                    <OrderItem key={order._id} {...order} />
                  </>
                );
              })}
              </>
          )}
            </Card>
        </div>
      </>
    );
}
