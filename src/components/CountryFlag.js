import React from 'react';
import styled from 'styled-components';

const Root = styled.span`
margin-right: 10px;
`;

export default class CountryFlag extends React.Component {

  render() {
    const {country} = this.props;

    if (!country || !country.code) return null;
    let code = country.code.toLowerCase();

    return (
      <Root className={`flag-icon flag-icon-${code}`} />
    )
  }
}
