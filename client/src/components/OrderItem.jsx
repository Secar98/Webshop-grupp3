import React,{ useState } from 'react'

export default function OrderItem({_id,status,totalPrice}) {
    console.log(_id)
        const [orderItem,setOrderItem] = useState(false)
    return (
        <div>
            <h4 onClick = {()=>setOrderItem(!orderItem)}>Order Number</h4>
            {orderItem && 
                <table>
                <tbody>
                    <tr>
                        <th>Order number</th>
                        <th>{_id}</th>
                    </tr>
                    <tr>
                        <th>status</th>
                        <th>{status}</th>
                    </tr>
                    <tr>
                        <th>Total Price</th>
                        <th>{totalPrice}</th>
                    </tr>
                </tbody>
            </table>
            }
        </div>
    )
}
