import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
margin-top: 50px;
background: #b4e4b2;
padding: 10px;
font-size: 1.2em;
border-radius: 5px;
`;

export default function SuccessMessage({message}) {
  return (
    <Root>{message}</Root>
  )
}