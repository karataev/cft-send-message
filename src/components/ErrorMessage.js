import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
color: #ff1744;
font-size: 0.8em;
`;

export default function ErrorMessage({message}) {
  return (
    <Root>{message}</Root>
  )
}