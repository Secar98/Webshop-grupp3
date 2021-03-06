import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap/";
import { UserContext } from "../context/userContext";

export default function ProductListItem(props) {
  const { pictures, title, price, _id } = props.product;

  const { isLoggedin } = useContext(UserContext)

  const onClickHandler = (e) => {
    const id = e.target.value;
    props.onAdd(id);
  };

  return (
    <>
      <Card className="shadow lightText colorBackground m-3">
        <Card.Img className="p-3" variant="top" src={pictures.picture1} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{price} SEK</Card.Text>
          <div className="flex">
            <Button>
              <Link to={`/${_id}`} className="lightText">
                Show details
              </Link>
            </Button>
            {
              isLoggedin && <Button onClick={onClickHandler} value={_id} >
                Add Product
              </Button>
            }
          </div >
        </Card.Body >
      </Card >
    </>
  );
}
