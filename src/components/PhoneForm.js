import React from 'react';
import styled from 'styled-components';
import CountriesList from "./CountriesList";
import CountryFlag from "./CountryFlag";
import ErrorMessage from './ErrorMessage';

const Form = styled.form`
width: 500px;
`;

const PhoneText = styled.div`
margin-bottom: 5px;
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
position: relative;
margin-right: 10px;
outline: none;
`;

const Input = styled.input`
border: none;
flex-grow: 1;
outline: none;
`;

const Button = styled.button`
background: #ff5252;
border: none;
padding: 10px 25px;
border-radius: 10px;
color: #fff;
font-size: 1.2em;
margin-top: 20px;
`;

const unknownCountry = {
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
      isCountriesOpen: false,
      selectedCountry: unknownCountry,
      errorMessage: null,
    }
  }

  findCountryByPhone(phone) {
    let country = this.props.countries.find(country => {
      return phone.indexOf(country.phoneInfo.prefix) === 0;
    });
    return country || unknownCountry;
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
      errorMessage: null,
    });
  };

  onCountrySelect = country => {
    let phoneWithPrefix = `${country.phoneInfo.prefix}${this.state.phone}`;
    let phone = this.normalizePhone(phoneWithPrefix, country);
    this.setState({
      phone: phone,
      selectedCountry: country,
      isCountriesOpen: false,
      errorMessage: null,
    });
    this.arrowRef.blur();
  };

  onSubmit = e => {
    e.preventDefault();
    let {selectedCountry, phone} = this.state;
    if (!selectedCountry.id || phone.length < selectedCountry.phoneInfo.minLength) {
      this.setState({errorMessage: 'Некорректный формат'});
      return;
    }
    let shouldSend = window.confirm('Вы уверены, что хотите отправить сообщение?');
    if (!shouldSend) return;
    this.props.onSuccess();
  };

  render() {
    const {countries} = this.props;
    const {isCountriesOpen, phone, selectedCountry, errorMessage} = this.state;
    let phoneWithPrefix = `${selectedCountry.phoneInfo.prefix}${phone}`;

    return (
      <Form onSubmit={this.onSubmit}>
        <PhoneText>Телефон</PhoneText>
        <InputHolder>
          <Arrow
            onFocus={() => this.setState({isCountriesOpen: true})}
            onBlur={() => this.setState({isCountriesOpen: false})}
            tabIndex="0"
            ref={el => this.arrowRef = el}
          >
            <CountryFlag country={selectedCountry}/>
            <img src={require('../img/arrow.png')} alt="Arrow"/>
            {isCountriesOpen && (
              <CountriesList
                countries={countries}
                onSelect={this.onCountrySelect}
              />
            )}
          </Arrow>
          +
          <Input
            type="tel"
            value={phoneWithPrefix}
            onChange={this.onPhoneChange}
          />
        </InputHolder>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <Button>Далее</Button>
      </Form>
    )
  }
}
