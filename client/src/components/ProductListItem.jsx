import React from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ProductListItem({product}) {
  const {pictures, title, price, _id} = product
  return (
    <>
      <Card className="shadow lightText colorBackground m-3">
        <Card.Img className="p-3" variant="top" src={pictures.picture1} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="flex">
            <Card.Text>{price} SEK</Card.Text>
            <Button><Link to={`/${_id}`} className="lightText">Go somewhere</Link></Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
