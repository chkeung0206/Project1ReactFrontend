import React, { useState } from 'react';
import ProductList from './components/productlist';
import HotProductCarousel from './components/hotproductcarousel';
import { Container } from 'react-bootstrap';
import CartItemAPIService from './APIService/cartitemAPIService';

function Home(props) {
  const [noOfPages, setNoOfPages] = useState(0);
  const { session, products, setProducts, cartItems, setCartItems, setCartTotal, setCartExpirationTime } = props;
  
  const handleAddToCart = async(product, quantity) => {     
    for (const [i, cart_item] of cartItems.entries()) {
      if (product.id === cart_item.product) {
        cart_item.quantity += quantity;
        await CartItemAPIService.UpdateCartItem(cart_item, session);
        let data = await CartItemAPIService.requestCartItem(cart_item.id, session);
        setCartItems(cartItems => {
          let prev = [...cartItems];
          prev[i] = data['data'];
          return prev
        });
        setCartTotal(data['cart-total']);
        setCartExpirationTime(data['cart-expiration-time'].split('T').join(' ').substring(0, 19));
        return
      }        
    }
    let cart_item = {
      product: product.id,
      quantity: quantity,
      offer: [],
    }
    let cart_item_id = await CartItemAPIService.AddCartItem(cart_item, session);
    let data = await CartItemAPIService.requestCartItem(cart_item_id, session);
    setCartItems(cartItems => {return [...cartItems, data['data']]});
    setCartTotal(data['cart-total']);
    setCartExpirationTime(data['cart-expiration-time'].split('T').join(' ').substring(0, 19));
  };

  return (
    <React.Fragment>
      <HotProductCarousel
        onAddToCart = {handleAddToCart}
      />      
      <Container>          
        <ProductList 
          products = {products}
          setProducts = {setProducts}
          noOfPages = {noOfPages}
          setNoOfPages = {setNoOfPages}
          onAddToCart = {handleAddToCart}
        />
      </Container>
    </React.Fragment>
  )
}

export default Home;
