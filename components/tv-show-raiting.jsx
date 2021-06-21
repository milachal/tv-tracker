import React from 'react';
import styled from 'styled-components';
import StarRaiting from '../images/star.svg';

const RaitingComponent = ({ children }) => (
  <Container>
    <StarIcon />
    <RaitingContainer>{children}</RaitingContainer>
  </Container>
);

export default RaitingComponent;

const Container = styled.span`
  display: inline-flex;
  align-items: center;
`;

const StarIcon = styled(StarRaiting)`
  width: 35px;
`;

const RaitingContainer = styled.span`
  color: inherit;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
`;
