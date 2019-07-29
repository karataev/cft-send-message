import React from 'react';
import styled from 'styled-components';

import {RoundButton} from "../styles/Buttons";

const Root = styled.div`
position: absolute;
z-index: 100;
top: 0;
left: 0;
right: 0;
bottom: 0;
`;

const Overlay = styled.div`
position: absolute;
width: 100%;
height: 100%;
background: #000;
opacity: 0.2;
`;

const ContentHolder = styled.div`
position: absolute;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
pointer-events: none;
`;

const Content = styled.div`
border: 2px solid #999;
border-radius: 4px;
background: #fff;
padding: 50px;
pointer-events: auto;
box-shadow: 0 1px 12px 0 rgba(0,0,0,.2);
`;

const Title = styled.h2`
margin-top: 0;
`;

const ButtonsHolder = styled.div`
text-align: right;
`;

const NoButton = styled(RoundButton)`
margin-right: 10px;
`;

export default class ConfirmPopup extends React.Component {

  render() {
    const {onConfirm, onCancel} = this.props;

    return (
      <Root>
        <Overlay onClick={onCancel}/>
        <ContentHolder>
          <Content>
            <Title>Вы уверены, что хотите отправить сообщение?</Title>
            <ButtonsHolder>
              <NoButton onClick={onCancel}>Нет</NoButton>
              <RoundButton primary onClick={onConfirm}>Да</RoundButton>
            </ButtonsHolder>
          </Content>
        </ContentHolder>
      </Root>
    )
  }
}
