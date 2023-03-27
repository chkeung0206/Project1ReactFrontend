import getURL from "../getURL"

export default class OrderItemAPIService {

  static requestOrderItems(token) {
    return fetch(getURL() + '/order_item/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Token ${token}`,
      }
    }) 
    .then(resp => resp.json())   
    .catch(error => console.log(error))    
  };
}
