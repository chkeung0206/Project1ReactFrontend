import getURL from "../getURL"

export default class CartItemAPIService {
    
  static requestCartItem(cart_item_id, session) { 
    return fetch(getURL() + `/cart_item/${cart_item_id}/`, {
      'method':'GET', 
      headers: {
        'Content-Type':'application/json',
        'session' : `${session}`,
      }
    })
    .then(resp => resp.json()) 
    .catch(error => console.log(error))
  };
  
  static requestCartItems(session) { 
    return fetch(getURL() + '/cart_item/', {
      'method':'GET', 
      headers: {
        'Content-Type':'application/json',
        'session' : `${session}`,
      }
    })
    .then(resp => resp.json()) 
    .catch(error => console.log(error))
  };

  static AddCartItem(cart_item, session) {
    return fetch(getURL() + '/cart_item/', {
      'method':'POST',
      headers: {
        'Content-Type':'application/json',
        'session' : `${session}`,
      },
      body: JSON.stringify(cart_item)
    }) 
    .then(resp => resp.json())   
    .catch(error => console.log(error))    
  };
  
  static UpdateCartItem(cart_item, session) {
    return fetch(getURL() + `/cart_item/${cart_item.id}/`, {
      'method':'PUT',
      headers: {
        'Content-Type':'application/json',
        'session' : `${session}`,
      },
      body: JSON.stringify(cart_item)
    })
    .then(resp => resp.json())   
    .catch(error => console.log(error))      
  };

  static DeleteCartItem(cart_item_id, session) {
    return fetch(getURL() + `/cart_item/${cart_item_id}/`, {
      'method':'DELETE',
      headers: {
        'Content-Type':'application/json',
        'session' : `${session}`,
      },
    })    
    .then(resp => resp.json())  
    .catch(error => console.log(error))
  }
}
