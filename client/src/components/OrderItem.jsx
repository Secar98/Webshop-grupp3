import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function OrderItem({_id,status,totalPrice,createdAt}) {

        const [orderItem,setOrderItem] = useState(false)
        
    return (
        <div className="m-2">
            <Button onClick = {()=>setOrderItem(!orderItem)}>Order Id : {_id}</Button>
            {orderItem && 
                <table>
                <tbody>
                    <tr>
                        <th>Status:</th>
                        <th>{status}</th>
                    </tr>
                    <tr>
                        <th>Total Price:</th>
                        <th>{totalPrice} SEK</th>
                    </tr>
                    <tr>
                        <th>created At</th>
                        <th>{createdAt.toString().split('T')[0]}</th>
                    </tr>
                </tbody>
            </table>
            }
        </div>
    )
}
