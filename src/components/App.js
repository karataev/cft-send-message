import React from 'react';
import styled from 'styled-components';
import PhoneForm from "./PhoneForm";
import 'flag-icon-css/css/flag-icon.css';
import axios from "axios";

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
    }
  }

  componentDidMount() {
    let countriesUrl = 'https://koronapay.com/online/api/countries';
    this.setState({isLoading: true});
    axios.get(countriesUrl)
      .then(res => {
        let countries = res.data.filter(country => country.phoneInfo);
        this.setState({
          countries,
        });
        console.log(countries);
      })
      .catch(err => {
        this.setState({isLoadError: true});
      })
      .finally(() => {
        this.setState({isLoading: false});
      })
  }


  onSendSuccess = () => {
    this.setState({comment: 'Сообщение было успешно отправлено'});
    setTimeout(() => {
      this.setState({comment: null});
    }, 5000);
  };

  render() {
    const {comment, countries, isLoading, isLoadError} = this.state;

    return (
      <Root>
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
                  onSuccess={this.onSendSuccess}
                  countries={countries}
                />
                {comment && (
                  <div>
                    {comment}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Root>
    );
  }
}
