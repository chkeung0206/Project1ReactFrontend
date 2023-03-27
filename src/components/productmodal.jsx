import React from 'react';
import { Badge, Button, Card, Modal, Image, Row, Col } from 'react-bootstrap';
import QuantityInputGroup from './quantityinputgroup';
import getURL from "../getURL"

function ProductModal(props) {
  const { product, showModal, setShowModal, quantity, setQuantity, onAddToCart } = props; 

  const parseImgUrl = url => {
    if (url.startsWith(getURL()))
      return url;
    return getURL() + url
  };

  return (
    <Modal 
      show={showModal} 
      onHide={() => setShowModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
            {product.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row md={2}>
          <Col className="my-auto">
            <Image
              src={ parseImgUrl(product.image) } 
              fluid={true}
            />
          </Col>
          <Col>            
            <Card className="mx-1 my-1">
              <Card.Body>
                <Card.Title>Category:</Card.Title>
                <Row md="auto" className="justify-content-center">
                  <Badge>{product.category_name}</Badge>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mx-1 my-1">
              <Card.Body>
                <Card.Title>Product Description:</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mx-1 my-1">
              <Card.Body>
                <Card.Title>Inventory:</Card.Title>
                <Card.Text className="text-center">
                    {product.inventory}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mx-1 my-1">
              <Card.Body>
                <Card.Title>Price:</Card.Title>
                <Card.Text className="productModalPriceText text-center">
                  ${parseFloat(product.price)} 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      {onAddToCart != null ? (
        <Modal.Footer>
          <Row md="auto" className="justify-content-center">
            <Col className="justify-content-center">
              <QuantityInputGroup
                quantity={quantity}
                setQuantity={setQuantity}
                max_val={product.inventory}
              />
            </Col>
            <Col className="justify-content-center">
              <Button 
                size="sm"
                variant="outline-success"
                disabled={quantity === 0}
                onClick={() => {
                  onAddToCart(product, quantity);
                  setShowModal(false)
                }}
              >
                Add To Cart
              </Button>
            </Col>
          </Row>        
        </Modal.Footer>
      ) : (<div/>)}
    </Modal>
  )
}
export default ProductModal;



