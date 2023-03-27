import getURL from "../getURL"

export default class OrderAPIService {

  static AddOrder(session, token) {
    return fetch(getURL() + '/order/', {
      'method':'POST',
      headers: {
        'Content-Type':'application/json',
        'session' : `${session}`,
        'Authorization':`Token ${token}`,
      }
    }) 
    .then(resp => resp.json())   
    .catch(error => console.log(error))    
  };
}
