import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CategoryAPIService from '../APIService/categoryAPIService';

function ProductSearchFilterForm(props) {
  const { onFormSubmit } = props; 
  const [categories, setCategories] = useState([]);

  useEffect(() => {    
    async function fetchData() {
      setCategories(await CategoryAPIService.requestCategories());
    };
    fetchData();
  }, []);

  return (
    <Form onSubmit={onFormSubmit}>
      <Row>
        <Col>
          <InputGroup className="mb-3">
              <Form.Control 
                placeholder="Search Here" 
                id="keyword"/>
              <Form.Select id="product_category" defaultValue=''>
                <option value=''>All Categories</option>
                {categories.map(category =>                
                  <option 
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )}
              </Form.Select>
          </InputGroup>
        </Col>
        <Col md="auto">
          <Button variant="primary" type="submit">
            Apply
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
export default ProductSearchFilterForm;
