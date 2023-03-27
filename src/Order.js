import React from 'react';
import { Container, Table } from 'react-bootstrap';
import './App.css';

function Order(props) {
  const { orderItems } = props;

  return (
    <React.Fragment>
      <h1>Your Order</h1>       
      {orderItems.length !== 0 ? (
        <Container>
          <Table striped hover variant="light">
            <thead>
              <tr>
                <th>OrderItemID</th>
                <th>Product</th>
                <th>Qty.</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map(order_item => (
                <tr key={order_item.id}>
                  <td>{order_item.id}</td>
                  <td>{order_item.product_name}</td>
                  <td>{order_item.quantity}</td>
                  <td>${ parseFloat(order_item.subtotal) }</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <h3>No order placed</h3>
      )} 
    </React.Fragment>
  )
}

export default Order;