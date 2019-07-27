import React from 'react';
import styled from 'styled-components';
import CountriesList from "./CountriesList";
import CountryFlag from "./CountryFlag";

const Form = styled.form`
width: 500px;
`;

const InputHolder = styled.div`
display: flex;
align-items: baseline;
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
      isCountriesOpen: true,
      selectedCountry: null,
    }
  }

  onArrowClick = e => {
    this.setState({isCountriesOpen: !this.state.isCountriesOpen});
  };

  findCountryByPhone(phone) {
    let phoneWithPlus = `+${phone}`;
    return this.props.countries.find(country => {
      return phoneWithPlus.indexOf(country.phoneInfo.prefix) === 0
    });
  }

  onPhoneChange = e => {
    let phone = e.target.value.replace(/\D/g, '');
    let country = this.findCountryByPhone(phone);
    if (country) {
      let {phoneInfo} = country;
      let maxLength = phoneInfo.maxLength + phoneInfo.prefix.replace('+', '').length;
      if (phone.length > maxLength) {
        phone = phone.slice(0, maxLength);
      }
    }
    this.setState({
      phone,
      selectedCountry: country,
    });
  };

  onCountrySelect = country => {
    let phone = country.phoneInfo.prefix.replace('+', '');
    this.setState({
      phone,
      selectedCountry: this.findCountryByPhone(phone),
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
    const {countries} = this.props;
    const {isCountriesOpen, phone, selectedCountry} = this.state;


    return (
      <Form onSubmit={this.onSubmit}>
        <div>Телефон</div>
        <InputHolder>
          <Arrow onClick={this.onArrowClick}>
            <CountryFlag country={selectedCountry}/>
            <img src={require('../img/arrow.png')} alt="Arrow"/>
          </Arrow>
          +
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
        <div>
          phone length with prefix: {phone.length}
        </div>
        {selectedCountry && (
          <div>
            <div>min length: {selectedCountry.phoneInfo.minLength}</div>
            <div>max length: {selectedCountry.phoneInfo.maxLength}</div>
          </div>
        )}
        <button>Далее</button>
      </Form>
    )
  }
}
