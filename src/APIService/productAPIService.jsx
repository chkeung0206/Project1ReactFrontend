import getURL from "../getURL"

export default class ProductAPIService {

    static requestProducts(active_category, search_keyword, results_per_page, page_no) { 
      return fetch(getURL() + '/product/', {
        'method':'GET', 
        headers: {
          'Content-Type':'application/json',
          'required-category' : `${active_category}`,
          'search-keyword' : `${search_keyword}`,
          'results-per-page' : `${results_per_page}`,
          'page-no' : `${page_no}`,
        }
      })
      .then(resp => resp.json())       
      .catch(error => console.log(error))
    }

    static requestProduct(product_id) { 
      return fetch(getURL() + `/product/${product_id}/`, {
        'method':'GET', 
        headers: {
          'Content-Type':'application/json',
        }
      })
      .then(resp => resp.json())       
      .catch(error => console.log(error))
    }

    static requestHotProducts() { 
      return fetch(getURL() + '/hot_product/', {
        'method':'GET', 
        headers: {
          'Content-Type':'application/json',
        }
      })
      .then(resp => resp.json())       
      .catch(error => console.log(error))
    }
}
