import React,{ useState } from 'react'

export default function OrderItem({_id,status,totalPrice}) {

        const [orderItem,setOrderItem] = useState(false)
        
    return (
        <div>
            <h6 onClick = {()=>setOrderItem(!orderItem)}>Order Id : {_id}</h6>
            {orderItem && 
                <table>
                <tbody>
                    <tr>
                        <th>status</th>
                        <th>{status}</th>
                    </tr>
                    <tr>
                        <th>Total Price</th>
                        <th>{totalPrice} SEK</th>
                    </tr>
                </tbody>
            </table>
            }
        </div>
    )
}
