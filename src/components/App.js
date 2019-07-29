import React from 'react';
import styled from 'styled-components';
import PhoneForm from "./PhoneForm";
import 'flag-icon-css/css/flag-icon.css';
import {connect} from "react-redux";
import SuccessMessage from "./SuccessMessage";
import ConfirmPopup from "./ConfirmPopup";
import {fetchCountries} from "../store/actions";

const Root = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 100px;
`;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: null,
      isPopupOpen: false,
    }
  }

  componentDidMount() {
    this.props.fetchCountries();
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
    const {comment, isPopupOpen} = this.state;
    const {isLoading, isLoadError, countries} = this.props;

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

function mapStateToProps(state) {
  return {
    countries: state.countries,
    isLoading: state.isLoading,
    isLoadError: state.isLoadError,
  }
}

const mapDispatchToProps = {
  fetchCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
