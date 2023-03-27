import React from 'react';
import { Container, Button, OverlayTrigger, Tooltip, Row } from 'react-bootstrap';
import CartItemAPIService from './APIService/cartitemAPIService';
import CartItemList from './components/cartitemlist';
import './App.css';

function Cart(props) {
  const { session, cartItems, setCartItems, cartTotal, 
          setCartTotal, cartExpirationTime, setCartExpirationTime, 
          onCheckout, logged_in, orderExists, onAddToCart } = props;

  const handleDeleteCartItem = async(i, cart_item) => {     
    let data = await CartItemAPIService.DeleteCartItem(cart_item.id, session);
    setCartItems(cartItems => {
      let prev = [...cartItems];
      prev.splice(i, 1);
      return prev
    }); 
    setCartTotal(data['cart-total']);
    setCartExpirationTime(data['cart-expiration-time'].split('T').join(' ').substring(0, 19));
  };

  const handleQuantityChange = async(i, cart_item, new_quantity) => { 
    cart_item.quantity = new_quantity;   
    await CartItemAPIService.UpdateCartItem(cart_item, session);
    let data = await CartItemAPIService.requestCartItem(cart_item.id, session);
    setCartItems(cartItems => {
      let prev = [...cartItems];
      prev[i] = data['data'];
      return prev
    });
    setCartTotal(data['cart-total']);
    setCartExpirationTime(data['cart-expiration-time'].split('T')[0]);
  };

  const renderTooltip = (props) => (
    logged_in ? (
      <span></span>
    ) : (      
      <Tooltip id="checkout-tooltip" {...props}>
        You're not logged in!
      </Tooltip>
    )
  );

  return (
    <React.Fragment>
      <h1>Your Cart</h1>       
      {cartItems.length !== 0 ? (
        <Container>
          <CartItemList
            cartItems = {cartItems}
            onDeleteCartItem = {handleDeleteCartItem}
            onQuantityChange = {handleQuantityChange}
            cartTotal = {cartTotal}
            cartExpirationTime = {cartExpirationTime}
          /> 
          <Row className="justify-content-end my-4" md={4}>
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip}
            >
              <Button 
                variant="success" 
                onClick={onCheckout}
                disabled={orderExists}
              >
                Checkout
              </Button> 
            </OverlayTrigger>
          </Row> 
        </Container>
      ) : (
        <h3>Your cart is empty</h3>
      )} 
    </React.Fragment>
  )
}

export default Cart;