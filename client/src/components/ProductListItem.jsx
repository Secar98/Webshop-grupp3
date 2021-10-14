import React from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ProductListItem({product}) {
  const {pictures, title, price, _id} = product
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={pictures.picture1} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{price} SEK</Card.Text>
          <Button variant="primary"><Link to={`/${_id}`}>Go somewhere</Link></Button>
        </Card.Body>
      </Card>
    </>
  )
}
