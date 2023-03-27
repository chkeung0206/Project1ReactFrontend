import getURL from "../getURL"

export default class CategoryAPIService {
    
  static requestCategories() { 
    return fetch(getURL() + '/category/', {
      'method':'GET', 
      headers: {
        'Content-Type':'application/json',
      }
    })
    .then(resp => resp.json()) 
    .catch(error => console.log(error))
  };
}
