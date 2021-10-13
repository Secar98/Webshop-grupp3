import React from 'react';

export default function ProductListItem({product}) {
  const {pictures, title, price} = product
  return (
    <div>
      <img src={pictures.picture1} alt="something" />
      <h5>{title}</h5>
      <p>{price} SEK</p>
    </div>
  )
}
