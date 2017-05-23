import 'es6-promise';
import cookie from 'react-cookie';

export default class epi {

  get(url) {
    return fetch(`${process.env.REACT_APP_EPIQUERY_CM}/${url}`, { method: 'GET', mode: 'cors', credentials: 'include', headers: { 'Authorization': `Bearer ${cookie.load('jwt')}` } }) 
    .then(response => { 
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json(); 
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  post(url, data) {

    return fetch(`${process.env.REACT_APP_EPIQUERY_CM}/${url}`, { method: 'POST', body: JSON.stringify(data), mode: 'cors', credentials: 'include', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${cookie.load('jwt')}` } })
    .then(response => { 
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json(); 
    })
    .catch( (error) => {
      console.log(error);
    })
  }

}