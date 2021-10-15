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


            </div>
        </div>
    )
}
