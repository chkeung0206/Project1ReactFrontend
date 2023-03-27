import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Home';
import Cart from './Cart';
import Login from './Login';
import Order from './Order';
import NavBar from './components/navbar';
import CartItemAPIService from './APIService/cartitemAPIService';
import OrderAPIService from './APIService/orderAPIService';
import OrderItemAPIService from './APIService/orderitemAPIService';
import './App.css';

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['token', 'username', 'session']);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartExpirationTime, setCartExpirationTime] = useState();
  const [orderItems, setOrderItems] = useState([]);
  
  useEffect(() => {  
    async function fetchData() {
      if (!cookie['session'])
        await setCookie('session', generateSessionCookie());
      let cart_data = await CartItemAPIService.requestCartItems(cookie['session']);
      setCartItems(cart_data['data']);
      if (cart_data['data'].length > 0){
        setCartTotal(cart_data['cart-total']);
        setCartExpirationTime(cart_data['cart-expiration-time'].split('T')[0]);
      }
      if (cookie['token']) {
        let order_item_data = await OrderItemAPIService.requestOrderItems(cookie['token']);
        setOrderItems(order_item_data);
      }
    } 
    fetchData();
  }, [cookie])  

  function generateSessionCookie(){
    let s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let session = '';
    for (let i = 0; i < 32; i++)
      session += s[Math.floor(Math.random() * s.length)];
    return session;
  };

  const handleLogout = () => {
    removeCookie('token');
    removeCookie('username');
  }  

  let navigate = useNavigate()
  const handleCheckout = async() => {
    if (cookie['token']){
      await OrderAPIService.AddOrder(cookie['session'], cookie['token']);
      let data = await OrderItemAPIService.requestOrderItems(cookie['token']);
      setOrderItems(data);
      setCartItems([]);
    }
    else
      navigate('/login')
  };

  return (
    <React.Fragment>
      <NavBar 
        username = {cookie['username']}
        onLogout = {handleLogout}
        cartItemCount = {cartItems.length}
        orderItemCount = {orderItems.length}
      />
      <Routes>

          <Route path="/" element={<Home 
            session = {cookie['session']}
            products = {products}
            setProducts = {setProducts}
            cartItems = {cartItems}
            setCartItems = {setCartItems}
            setCartTotal = {setCartTotal}
            setCartExpirationTime = {setCartExpirationTime} 
          />}/>

          <Route path="/Login" element={<Login 
            cookie = {cookie}
            setCookie = {setCookie}
          />}/>

          <Route path="/Cart" element={<Cart 
            session = {cookie['session']}
            products = {products}
            cartItems = {cartItems}
            setCartItems = {setCartItems}
            cartTotal = {cartTotal}
            setCartTotal = {setCartTotal}
            cartExpirationTime = {cartExpirationTime}
            setCartExpirationTime = {setCartExpirationTime}
            logged_in = {Boolean(cookie['token'])}
            onCheckout = {handleCheckout}
            orderExists = {orderItems.length > 0}
          />}/>

          <Route path="/Order" element={<Order
            orderItems = {orderItems}
          />}/>

      </Routes>
    </React.Fragment>
  )
}

export default App;
