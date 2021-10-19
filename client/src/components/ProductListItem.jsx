import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function ProductListItem(props) {
  const { pictures, title, price, _id } = props.product;

  const onClickHandler = (e) => {
    const id = e.target.value;
    props.onAdd(id);
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={pictures.picture1} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{price} SEK</Card.Text>
          <Button variant="primary">
            <Link className=" text-white" to={`/${_id}`}>
              Go somewhere
            </Link>
          </Button>
          <Button onClick={onClickHandler} value={_id}>
            Add Product
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
