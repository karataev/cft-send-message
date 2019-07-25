import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CountriesList from "./CountriesList";
import CountryFlag from "./CountryFlag";

const Form = styled.form`
width: 500px;
`;

const InputHolder = styled.div`
display: flex;
align-items: center;
border: 1px solid #e0e0e0;
border-radius: 2px;
padding: 10px;

&:focus-within {
  border: 1px solid #448aff;
}
`;

const Arrow = styled.div`
margin-right: 10px;
`;

const Input = styled.input`
border: none;
flex-grow: 1;
outline: none;
`;

export default class PhoneForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      countries: [],
      isCountriesOpen: true,
      selectedCountry: null,
    }
  }

  componentDidMount() {
    let countriesUrl = 'https://koronapay.com/online/api/countries';
    axios.get(countriesUrl)
      .then(res => {
        let countries = res.data.filter(country => country.phoneInfo);
        this.setState({countries});
        console.log(countries);
      })
  }

  onArrowClick = e => {
    this.setState({isCountriesOpen: !this.state.isCountriesOpen});
  };

  onPhoneChange = e => {
    this.setState({phone: e.target.value});
  };

  onCountrySelect = country => {
    this.setState({
      selectedCountry: country,
      phone: country.phoneInfo.prefix,
      isCountriesOpen: false,
    })
  };

  onSubmit = e => {
    e.preventDefault();
    let shouldSend = window.confirm('Вы уверены, что хотите отправить сообщение?');
    if (!shouldSend) return;
    this.props.onSuccess();
  };

  render() {
    const {countries, isCountriesOpen, phone, selectedCountry} = this.state;


    return (
      <Form onSubmit={this.onSubmit}>
        <div>Телефон</div>
        <InputHolder>
          <Arrow onClick={this.onArrowClick}>
            <CountryFlag country={selectedCountry}/>
            <img src={require('../img/arrow.png')} alt="Arrow"/>
          </Arrow>
          <Input
            type="tel"
            value={phone}
            onChange={this.onPhoneChange}
          />
        </InputHolder>
        {isCountriesOpen && (
          <CountriesList
            countries={countries}
            onSelect={this.onCountrySelect}
          />
        )}
        <button>Далее</button>
      </Form>
    )
  }
}
