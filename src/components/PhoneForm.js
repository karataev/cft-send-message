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

const nullCountry = {
  phoneInfo: {
    prefix: '',
    minLength: 12,
    maxLength: 12,
  }
};

export default class PhoneForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      isCountriesOpen: true,
      selectedCountry: nullCountry,
    }
  }

  onArrowClick = e => {
    this.setState({isCountriesOpen: !this.state.isCountriesOpen});
  };

  findCountryByPhone(phone) {
    let country = this.props.countries.find(country => {
      return phone.indexOf(country.phoneInfo.prefix) === 0;
    });
    return country || nullCountry;
  }

  normalizePhone(phoneWithPrefix, country) {
    return phoneWithPrefix
      .slice(country.phoneInfo.prefix.length)
      .slice(0, country.phoneInfo.maxLength);
  }

  onPhoneChange = e => {
    let inputValue = e.target.value.replace(/\D/g, '');
    let country = this.findCountryByPhone(inputValue);
    let phone = this.normalizePhone(inputValue, country);

    this.setState({
      phone,
      selectedCountry: country,
    });
  };

  onCountrySelect = country => {
    let phoneWithPrefix = `${country.phoneInfo.prefix}${this.state.phone}`;
    let phone = this.normalizePhone(phoneWithPrefix, country);
    this.setState({
      phone: phone,
      selectedCountry: country,
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
    let phoneWithPrefix = `${selectedCountry.phoneInfo.prefix}${phone}`;

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
            value={phoneWithPrefix}
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
          phone length: {phone.length}
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
