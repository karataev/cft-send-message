import React from 'react';
import styled from 'styled-components';
import CountryFlag from "./CountryFlag";

const Root = styled.div`
padding: 13px;
font-size: 0.8em;
color: #424242;
background: #fff;

&:hover {
background: #eee;
}
`;

export default class CountryItem extends React.Component {

  render() {
    const {country} = this.props;

    return (
      <Root onClick={() => this.props.onSelect(country)}>
        <CountryFlag country={country} />
        {country.name} (+{country.phoneInfo.prefix})
      </Root>
    )
  }
}
