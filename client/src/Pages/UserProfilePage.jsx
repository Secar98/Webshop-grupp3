import React from 'react'
import { FaUser } from 'react-icons/fa';

export default function UserProfilePage() {

    // Get user data- check if a user is present fetch data from /api/user here or get it from the context if saved there
    return (
        <div className="row">
            
            <div className="col-md-3 border rounded">
                <div>
                    <FaUser style={{fontSize: '7rem'}} />
                    <h2>Name</h2>
                </div>
                <div>
                <h4>My profile</h4>      
                <h4>My Orders</h4>      
                </div>
                <p>Logout</p>
            </div>
            <div className="col-md-8 border rounded m-3">
                <h1>My Profile</h1>      
                <table>
                    <tbody>
                        <tr>
                            <td>Full Name</td>
                            <th>Test</th>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <th>Test@example.com</th>
                        </tr>
                        <tr>
                            <td>Delivery adress</td>
                            <th>Test adress</th>
                        </tr>               
                    </tbody>
                </table>
            </div>
        </div>
    )
}
