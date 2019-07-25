import React from 'react';
import styled from 'styled-components';
import PhoneForm from "./PhoneForm";

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
    }
  }

  onSendSuccess = () => {
    this.setState({comment: 'Сообщение было успешно отправлено'});
    setTimeout(() => {
      this.setState({comment: null});
    }, 5000);
  };

  render() {
    const {comment} = this.state;

    return (
      <Root>
        <PhoneForm
          onSuccess={this.onSendSuccess}
        />
        {comment && (
          <div>
            {comment}
          </div>
        )}
      </Root>
    );
  }
}
