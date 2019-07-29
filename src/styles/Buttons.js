import styled from 'styled-components';

export const RoundButton = styled.button`
background: ${props => props.primary ? '#ff5252' : '#999'};
border: none;
padding: 10px 25px;
border-radius: 10px;
color: #fff;
font-size: 1.2em;
margin-top: 20px;
`;
