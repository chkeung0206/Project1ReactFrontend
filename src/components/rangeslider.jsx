import React from 'react';
import { Form } from 'react-bootstrap';

function RangeSlider(props) {

  const handleRangeChange = value => {
    props.setValue(value);
    props.setPageNo(1);
  };

  return (
    <Form>
      <Form.Label>Results per page</Form.Label>
      <Form.Group>
        <Form.Range
          min = {20}
          max = {100}
          step = {20}
          value={props.value}
          onChange={e => handleRangeChange(e.target.value)}
        />
        <Form.Control 
          value={props.value}
          onChange={e => handleRangeChange(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}
export default RangeSlider;
