import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function OrderItem({_id,status,totalPrice}) {

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
                </tbody>
            </table>
            }
        </div>
    )
}
