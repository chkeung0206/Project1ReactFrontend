import React from 'react';
import CartItem from './cartitem';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

function CartItemList(props) {
  const { cartItems, onDeleteCartItem, onQuantityChange, cartTotal, cartExpirationTime } = props;
  
  return (
    <ListGroup>
      <ListGroupItem>
        <Row>
          <Col className="col-4"/>
          <Col className="col-3">Product</Col>
          <Col>
            <Row className="mx-4">
              &nbsp;Qty.
            </Row>            
          </Col>
          <Col>
            <Row className="mx-2 justify-content-end">
              Subtotal
            </Row>
          </Col>
        </Row>
      </ListGroupItem>
      {cartItems.map((cart_item, i) => 
        <CartItem
          key = {cart_item.id}
          i = {i}
          cart_item = {cart_item}
          onDeleteCartItem = {onDeleteCartItem}
          onQuantityChange = {onQuantityChange}
        />
      )}
      <ListGroupItem>
        <Row md={2}>
          <Col>
            <Row className="mx-2">
              Cart expires on: {cartExpirationTime}
            </Row>
          </Col>
          <Col>
            <Row className="mx-2 justify-content-end">
              Total: ${cartTotal}
            </Row>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
}
export default CartItemList;
