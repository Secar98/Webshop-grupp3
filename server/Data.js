const user = new UserModel({
  fullName: "test",
  password: "12345",
  email: "test",
  phoneNumber: 1234556,
  deliveryAdress: {
    postalCode: 12345,
    streetAdress: "test",
    city: "test",
  },
});
user.save();

//////

const product = new ProductModel({
  title: "test",
  pictures: {
    picture1: "test",
    picture2: "test",
    picture3: "test",
  },
  price: 25,
  description: "test",
  category: ["test"],
  weight: 25,
  manufacturer: "test",
});

product.save();

////

const order = new OrdersModel({
  user: "6164707600930933d55f9296",
  products: [
    {
      product: "616476a066f9d18e67689c51",
      amount: 20,
    },
  ],
  shipping: 25,
  totalPrice: 25,
  deliveryAdress: {
    postalCode: 12345,
    streetAdress: "test",
    city: "test",
  },
  status: "test",
});

order.save();
