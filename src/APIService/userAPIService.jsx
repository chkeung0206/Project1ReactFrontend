import getURL from "../getURL"

export default class UserAPIService {

  static LoginUser(user) {
    return fetch(getURL() + '/auth/', {
      'method':'POST',
      headers: {
          'Content-Type':'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .catch(error => console.log(error));
  }

  static RegisterUser(user) {
    return fetch(getURL() + '/user/', {
      'method':'POST',
      headers: {
          'Content-Type':'application/json',
      },
      body: JSON.stringify(user)
    })
  }
}
