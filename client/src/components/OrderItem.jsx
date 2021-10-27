import React,{ useState } from 'react';
import {Link} from 'react-router-dom';

export default function OrderItem({_id,status,totalPrice,createdAt,products}) {

        const [orderItem,setOrderItem] = useState(false)
        
    return (
        <div>
            <h6 onClick = {()=>setOrderItem(!orderItem)}>Order Id : {_id}</h6>
            {orderItem && 
            <>
              <table>
                <thead>
                  <th>Product title:</th>
                  <th>Product quantity:</th>
                </thead>
                <tbody>
                  {products.map((item, index) => {
                    return (
                        <tr>
                          <td><Link to={`/${item.product._id}`}>{item.product.title}</Link></td>
                          <td>{item.amount}</td>
                        </tr>                
                    )
                  })}
                </tbody>
              </table>

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
                    <tr>
                        <th>created At</th>
                        <th>{createdAt.toString().split('T')[0]}</th>
                    </tr>
                </tbody>
              </table>
            </>
            }
        </div>
    )
}
