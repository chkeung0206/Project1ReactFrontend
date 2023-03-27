import React, { useState, useEffect } from 'react';
import { CloseButton, Image, ListGroupItem, Row, Col } from 'react-bootstrap';
import ProductAPIService from '../APIService/productAPIService';
import QuantityInputGroup from './quantityinputgroup';
import ProductModal from './productmodal';
import getURL from "../getURL"

function CartItem(props) {
  const { i, cart_item, onDeleteCartItem, onQuantityChange } = props;
  const [ quantity, setQuantity ] = useState(cart_item.quantity);
  const [ product, setProduct ] = useState();
  const [ showModal, setShowModal ] = useState(false);

  useEffect(() => { 
    if (cart_item.quantity != quantity)
      onQuantityChange(i, cart_item, quantity);
  }, [quantity]); 
  
  useEffect(() => { 
    setShowModal(true);
  }, [product]); 

  const handleShowModal = async() => {
    let data = await ProductAPIService.requestProduct(cart_item.product);
    setProduct(data);
  };

  return (
    <ListGroupItem>
      <Row>
        <Col className="my-auto col-2">
          <CloseButton
            onClick = {() => onDeleteCartItem(i, cart_item)}
            className="mx-2"
          /> 
        </Col>
        <Col className="my-auto col-2">
          <Row>
            <Image 
              className="cartItemImg"
              src={getURL() + cart_item.product_image}
              onClick = {() => handleShowModal()}
            />
          </Row>
        </Col>
        <Col className="my-auto col-3">
          {cart_item.product_name}
        </Col>
        <Col md="auto" className="my-auto">
          <QuantityInputGroup
            quantity = {quantity}
            setQuantity = {setQuantity}
            onQuantityChange = {onQuantityChange}
            max_val = {cart_item.product_inventory}
          />
        </Col>
        <Col className="my-auto">
          <Row className="mx-2 justify-content-end">
            ${cart_item.subtotal}
          </Row>
        </Col>  
      </Row>      
      {product != null ? (
        <ProductModal
          product = {product}
          showModal = {showModal}
          setShowModal = {setShowModal}
          quantity = {1}
          setQuantity = {setQuantity}
          onAddToCart = {null}
        />
      ) : (<div/>)}  
    </ListGroupItem>
  )
}
export default CartItem;
