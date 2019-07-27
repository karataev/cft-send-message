import React from 'react';
import styled from 'styled-components';
import CountryItem from "./CountryItem";

const Root = styled.div`
position: absolute;
top: 30px;
left: -10px;
width: 500px;
max-height: 200px;
overflow: auto;
box-shadow: 0 1px 12px 0 rgba(0,0,0,.1);
`;

export default class CountriesList extends React.Component {

  render() {
    const {countries} = this.props;

    return (
      <Root>
        {countries.map(country => (
          <CountryItem
            key={country.id}
            country={country}
            onSelect={this.props.onSelect}
          />
        ))}
      </Root>
    )
  }
}
