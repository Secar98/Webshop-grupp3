import React from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ProductListItem(props) {
  // const {pictures, title, price, _id} = product

  console.log(props)

  const onClickHandler = (e) => {
    const id = e.target.value;
    props.onAdd(id);
  }

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.product.pictures.picture1} />
        <Card.Body>
          <Card.Title>{props.product.title}</Card.Title>
          <Card.Text>{props.product.price} SEK</Card.Text>
          <Button variant="primary"><Link to={`/${props.product._id}`}>Go somewhere</Link></Button>
          <Button onClick={onClickHandler} value={props.product._id}>Add Porduct</Button>
        </Card.Body>
      </Card>
    </>
  )
}
