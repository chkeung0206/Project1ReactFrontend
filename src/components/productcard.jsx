import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Overlay, Tooltip, Row, Col } from 'react-bootstrap';
import ProductModal from './productmodal';
import QuantityInputGroup from './quantityinputgroup';
import getURL from "../getURL"

function ProductCard(props) {

  const { product, onAddToCart } = props;
  const [ quantity, setQuantity ] = useState(1);  
  const [ showModal, setShowModal ] = useState(false);
  const [ showOverlay, setShowOverlay ] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowOverlay(false)
    }, 2000);

    return () => clearInterval(timer);
  }, [showOverlay]);

  return (    
      <Card className="productCard my-3">
        <Card.Img 
          className="productCardImg"
          variant="top" 
          src={getURL() + product.image} 
          onClick = {() => setShowModal(true)}
        />
        <Card.Body onClick = {() => setShowModal(true)}>
          <Card.Title> { product.name } </Card.Title>
          <Card.Text> ${ parseFloat(product.price) } </Card.Text>          
        </Card.Body>
        <Card.Footer>
          {product.inventory > 0 ? (
            <Row md={2} className="g-3">
              <Col>
                <Row>
                    <QuantityInputGroup
                      quantity = {quantity}
                      setQuantity = {setQuantity}
                      max_val = {product.inventory}
                    />
                </Row>
              </Col>
              <Col>
                <Row className="mx-auto">
                  <Button 
                    ref={target}
                    size="sm"
                    variant="outline-success"
                    disabled={quantity === 0}
                    onClick={() => {
                      setShowOverlay(true);
                      onAddToCart(product, quantity);
                    }}
                  >
                    Add
                  </Button>
                  <Overlay 
                    target={target.current}
                    show={showOverlay}
                    placement="top"
                    transition={true}
                  >
                    {(props) => (
                      <Tooltip id="added-to-cart" {...props}>
                        Product added to cart!
                      </Tooltip>
                    )}
                  </Overlay>
                </Row>
              </Col>
            </Row>
          ) : (
            <Row className="my-1 justify-content-center">Out of stock!</Row>
          )}
        </Card.Footer>
        <ProductModal
          product = {product}
          showModal = {showModal}
          setShowModal = {setShowModal}
          quantity = {quantity}
          setQuantity = {setQuantity}
          onAddToCart = {onAddToCart}
        />
      </Card>
  )
}
export default ProductCard;



