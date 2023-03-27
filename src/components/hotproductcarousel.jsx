import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import ProductModal from './productmodal';
import ProductAPIService from '../APIService/productAPIService';

function HotProductCarousel(props) {
  const { onAddToCart } = props;
  const [ hotProducts, setHotProducts ] = useState([]); 
  const [ index, setIndex ] = useState(0);
  const [ modalIndex, setModalIndex ] = useState(0);
  const [ quantity, setQuantity ] = useState(1);  
  const [ showModal, setShowModal ] = useState(false);

  useEffect(() => { 
    async function fetchData() {
      let data = await ProductAPIService.requestHotProducts();
      setHotProducts(data);
    };    
    fetchData();
  }, [])

  return (
    <React.Fragment>
      <Carousel 
        className="hotProductCarousel"
        activeIndex={index}
        onSelect={(selectedIndex, e) => setIndex(selectedIndex)}
      >
        {hotProducts.map(hot_product => 
          <Carousel.Item key={hot_product.id}> 
            <img
              className="hotProductCarouselImg d-block w-100"
              src={ hot_product.image } 
              onClick={async() => {
                await setModalIndex(index);
                setShowModal(true);
              }}
            />
            <Carousel.Caption className="hotProductCarouselText">
              <h2>{hot_product.name}</h2>
              <p>
                {hot_product.description}
              </p>
            </Carousel.Caption>         
          </Carousel.Item>    
        )}
      </Carousel>
      {hotProducts.length > 0 ? (
        <ProductModal
          product = {hotProducts[modalIndex]}
          showModal = {showModal}
          setShowModal = {setShowModal}
          quantity = {quantity}
          setQuantity = {setQuantity}
          onAddToCart = {onAddToCart}
        />
      ) : (<div/>)}
    </React.Fragment>
  );
}
export default HotProductCarousel;
