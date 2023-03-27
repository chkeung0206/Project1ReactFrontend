import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

function QuantityInputGroup(props) {

  const { quantity, setQuantity, max_val } = props;
  const [ tempQuantity, setTempQuantity ] = useState(quantity);

  useEffect(() => {  
    setTempQuantity(quantity);
  }, [quantity]) 

  const handleQuantityInput = val => {
    if (!val || Number(val)){
      val=Math.max(0, Math.min(max_val, val));
      setTempQuantity(val);
    }
  };

  return (
    <InputGroup>
      <Button 
        size="sm" 
        variant="secondary"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
      >
        -
      </Button>            
      <Form.Control
        className="text-center"
        htmlSize={2}
        size="sm"
        value={tempQuantity}
        min = {0}
        max = {max_val}
        onChange={e => handleQuantityInput(e.target.value)}
        onBlur={e => setQuantity(Number(e.target.value))}
      />            
      <Button 
        size="sm" 
        variant="secondary"
        onClick={() => setQuantity(quantity + 1)}
        disabled={quantity >= max_val}
      >
        +
      </Button>
    </InputGroup>
  )
}
export default QuantityInputGroup;



