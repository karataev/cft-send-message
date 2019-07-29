import React from 'react';
import styled from 'styled-components';
import PhoneForm from "./PhoneForm";
import 'flag-icon-css/css/flag-icon.css';
import axios from "axios";
import SuccessMessage from "./SuccessMessage";
import ConfirmPopup from "./ConfirmPopup";

const Root = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 100px;
`;

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: null,
      countries: [],
      isLoading: true,
      isLoadError: false,
      isPopupOpen: false,
    }
  }

  componentDidMount() {
    let countriesUrl = 'https://koronapay.com/online/api/countries';
    this.setState({isLoading: true});
    axios.get(countriesUrl)
      .then(res => {
        let countries = res.data
          .filter(country => country.phoneInfo);
        countries.forEach(country => country.phoneInfo.prefix = country.phoneInfo.prefix.replace('+', ''));
        this.setState({
          countries,
        });
      })
      .catch(err => {
        this.setState({isLoadError: true});
      })
      .finally(() => {
        this.setState({isLoading: false});
      })
  }


  onFormComplete = () => {
    this.setState({isPopupOpen: true});
  };

  onConfirmMessage = () => {
    this.setState({
      isPopupOpen: false,
      comment: 'Сообщение было успешно отправлено',
    });

    setTimeout(() => {
      this.setState({comment: null});
    }, 5000);

  };

  onCancelMessage = () => {
    this.setState({isPopupOpen: false});
  };

  render() {
    const {comment, countries, isLoading, isLoadError, isPopupOpen} = this.state;

    return (
      <Root>
        {isPopupOpen && (
          <ConfirmPopup
            onConfirm={this.onConfirmMessage}
            onCancel={this.onCancelMessage}
          />
        )}
        {isLoading && <div>Загрузка...</div>}
        {!isLoading && (
          <div>
            {isLoadError && (
              <div>
                <p>Во время загрузки данных произошла ошибка.</p>
                <p>Проверьте, что у вас установлено
                  {' '}
                  <a
                    href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >расширение</a>
                  , разрешающее CORS.</p>
              </div>
            )}
            {!isLoadError && (
              <div>
                <PhoneForm
                  onComplete={this.onFormComplete}
                  countries={countries}
                />
                {comment && <SuccessMessage message={comment} />}
              </div>
            )}
          </div>
        )}
      </Root>
    );
  }
}
