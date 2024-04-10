import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showOrderBox, setShowOrderBox] = useState(false);
  const [orderDate, setOrderDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const addItemToCart = (name, price) => {
    const updatedCartItems = [...cartItems, { name, price }];
    const newTotalPrice = totalPrice + price;
    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
  };
  const getCurrentDateTime = () => {
    return new Date().toLocaleString();
  };
  const calculateDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDateTime = currentDate.setDate(currentDate.getDate() + 4);
    return new Date(deliveryDateTime).toLocaleString();
  };
  const handleBuyItems = () => {
    setOrderDate(getCurrentDateTime());
    setDeliveryDate(calculateDeliveryDate());
    setShowOrderBox(true);
  };

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
      <h1>Shopping Cart</h1>
      <div id="cart">
        <h2>Cart</h2>
        <ul id="cart-items">
          {cartItems.map((item, index) => (
            <li key={index}>{item.name} - {<i class="fa-solid fa-indian-rupee-sign"></i>}{item.price.toFixed(2)}</li>
          ))}
        </ul>
        <p>Total: {<i class="fa-solid fa-indian-rupee-sign"></i>}{totalPrice.toFixed(2)}</p>
        <button onClick={handleBuyItems}>Buy Items</button>
      </div>
      {showOrderBox && (
            <div id="cart">
              <h2>Order Details</h2>
              <ul id="cart-items">
              {cartItems.map((item, index) => (
                <li key={index}>{item.name} - {<i class="fa-solid fa-indian-rupee-sign"></i>}{item.price.toFixed(2)}</li>
              ))}
            </ul>
              <p>Total: {<i class="fa-solid fa-indian-rupee-sign"></i>}{totalPrice.toFixed(2)}</p>
              <p>Order Date: {orderDate}</p>
              <p>Estimated Delivery Date: {deliveryDate}</p>
            </div>
      )}
<div id="items">
    <h2>Anemic Medicine</h2>
    <div class="item">
        <img src="img1.png" alt="Product 1"/>
        <span>Iron Tablets 50gm</span>
        <hr/>
        <div class="product-details">
            <span><s><i class="fa-solid fa-indian-rupee-sign"></i>1200</s></span><br/>
            <span><i class="fa-solid fa-indian-rupee-sign"></i>499</span>
            <button onClick={() => addItemToCart('Iron Tablets 50gm', 499)}>Add</button>
        </div>
    </div>
    <div class="item">
        <img src="img2.png" alt="Product 2"/>
        <span>Anaemia BC-1 Tablets 50gm</span>
        <hr/>
        <div class="product-details">
            <span><s><i class="fa-solid fa-indian-rupee-sign"></i>1000</s></span><br/>
            <span><i class="fa-solid fa-indian-rupee-sign"></i>399</span>
            <button onClick={() => addItemToCart('Anaemia BC-1 Tablets 50gm', 399)}>Add</button>
        </div>
    </div>
    <div class="item">
        <img src="img3.png" alt="Product 2"/>
        <span>Anaemia Tablets 25gm</span>
        <hr/>
        <div class="product-details">
            <span><s><i class="fa-solid fa-indian-rupee-sign"></i>150</s></span><br/>
            <span><i class="fa-solid fa-indian-rupee-sign"></i>99</span>
            <button onClick={() => addItemToCart('Anaemia Tablets 25gm', 99)}>Add</button>
        </div>
    </div>
    <h2>Anemic Medicine</h2>
    <div class="item">
        <img src="img1.png" alt="Product 1"/>
        <span>Iron Tablets 50gm</span>
        <hr/>
        <div class="product-details">
            <span><s><i class="fa-solid fa-indian-rupee-sign"></i>1200</s></span><br/>
            <span><i class="fa-solid fa-indian-rupee-sign"></i>499</span>
            <button onClick={() => addItemToCart('Iron Tablets 50gm', 499)}>Add</button>
        </div>
    </div>
    <div class="item">
        <img src="img2.png" alt="Product 2"/>
        <span>Anaemia BC-1 Tablets 50gm</span>
        <hr/>
        <div class="product-details">
            <span><s><i class="fa-solid fa-indian-rupee-sign"></i>1000</s></span><br/>
            <span><i class="fa-solid fa-indian-rupee-sign"></i>399</span>
            <button onClick={() => addItemToCart('Anaemia BC-1 Tablets 50gm', 399)}>Add</button>
        </div>
    </div>
    <div class="item">
        <img src="img3.png" alt="Product 2"/>
        <span>Anaemia Tablets 25gm</span>
        <hr/>
        <div class="product-details">
            <span><s><i class="fa-solid fa-indian-rupee-sign"></i>150</s></span><br/>
            <span><i class="fa-solid fa-indian-rupee-sign"></i>99</span>
            <button onClick={() => addItemToCart('Anaemia Tablets 25gm', 99)}>Add</button>
        </div>
    </div>
</div>

    </div>
  );
};

export default Cart;
