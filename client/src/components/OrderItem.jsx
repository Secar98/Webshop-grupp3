import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

export default function OrderItem({_id,status,totalPrice,createdAt,products}) {

        const [orderItem,setOrderItem] = useState(false)
        
    return (
        <div className="m-2">
            <Button onClick = {()=>setOrderItem(!orderItem)}>Order Id : {_id}</Button>
            {orderItem && 
            <>
              <Table bordered>
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
              </Table>

              <Table bordered>
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
              </Table>
            </>
            }
        </div>
    )
}
