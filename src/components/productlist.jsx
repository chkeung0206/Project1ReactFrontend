import React, { useState, useEffect } from 'react';
import ProductCard from './productcard';
import { Col, Row } from 'react-bootstrap';
import RangeSlider from './rangeslider';
import ProductPagination from './productspagination';
import ProductSearchFilterForm from './productsearchfilterform';
import ProductAPIService from '../APIService/productAPIService';

function ProductList(props) {
  const { products, setProducts, noOfPages, setNoOfPages, onAddToCart } = props;
  const [ resultsPerPage, setResultsPerPage ] = useState(20);
  const [ activeCategory, setActiveCategory ] = useState('');
  const [ searchKeyword, setSearchKeyword ] = useState('');
  const [ pageNo, setPageNo ] = useState(1);

  useEffect(() => {    
    async function fetchData() {
      let data = await ProductAPIService.requestProducts(activeCategory, searchKeyword, resultsPerPage, pageNo);
      setProducts(data['data']);
      setNoOfPages(parseInt(data['no-of-pages']));
    } 
    if (resultsPerPage)
      fetchData();
  }, [activeCategory, searchKeyword, resultsPerPage, pageNo])

  const handleFormSubmit = e => {
    e.preventDefault();
    setActiveCategory(e.currentTarget.product_category.value);
    setSearchKeyword(e.currentTarget.keyword.value);
  };

  return (
    <React.Fragment>
      <h1>Products</h1>
      <Row>
        <ProductSearchFilterForm
          onFormSubmit = {handleFormSubmit}
        />
      </Row>
      {noOfPages !== 0 ? ( 
        <React.Fragment>
          <Row className="justify-content-end" md={4}>
            <RangeSlider 
              value = {resultsPerPage}
              setValue = {setResultsPerPage}
              setPageNo = {setPageNo}
            />
          </Row>  
          <Row xs={2} md={4} className="my-4">
            {products.map(product => 
              <Col key = {product.id}>
                  <ProductCard  
                    onAddToCart = {onAddToCart}         
                    product = {product}
                  />
              </Col>
            )}
          </Row>
          <Row>
            <ProductPagination
              pageNo = {pageNo}
              setPageNo = {setPageNo}
              noOfPages = {noOfPages}
            />
          </Row>
        </React.Fragment>
      ) : (
        <Row className="productNotFound my-2">
          <h3>Product not found</h3>
        </Row>
      )}
    </React.Fragment>
  );
}
export default ProductList;
