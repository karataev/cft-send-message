import React from 'react';
import styled from 'styled-components';

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
border: 5px solid green;
`;

const Content = styled.div`
border: 2px solid black;
background: #fff;
padding: 50px;
`;

export default class ConfirmPopup extends React.Component {

  render() {
    return (
      <Root>
        <Overlay/>
        <ContentHolder>
          <Content>
            content here
            <button onClick={this.props.onCancel}>cancel</button>
            <button onClick={this.props.onConfirm}>confirm</button>
          </Content>
        </ContentHolder>
      </Root>
    )
  }
}
