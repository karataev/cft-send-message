import axios from 'axios';

export const COUNTRIES_SUCCESS = 'COUNTRIES_SUCCESS';
export const COUNTRIES_ERROR = 'COUNTRIES_ERROR';

export function fetchCountries() {
  return dispatch => {
    let countriesUrl = 'https://koronapay.com/online/api/countries';
    axios.get(countriesUrl)
      .then(res => {
        let countries = res.data
          .filter(country => country.phoneInfo);
        countries.forEach(country => country.phoneInfo.prefix = country.phoneInfo.prefix.replace('+', ''));
        dispatch({type: COUNTRIES_SUCCESS, payload: countries});
      })
      .catch(() => {
        dispatch({type: COUNTRIES_ERROR});
      })
  }
}
