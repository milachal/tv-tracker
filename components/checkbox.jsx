import React from 'react';
import styled from 'styled-components';

const Checkbox = () => (
  <Label>
    <Input type="checkbox" />
    <CheckboxContainer>Watched</CheckboxContainer>
  </Label>
);

export default Checkbox;

const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
  position: relative;
`;

const Input = styled.input`
  height: 25px;
  width: 25px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: 1px solid #34495E;
  border-radius: 4px;
  outline: none;
  transition-duration: 0.3s;
  cursor: pointer;
  &:checked {
    border: 1px solid #3EB595;
    content: '\2713';
    display: block;
    text-align: center;
    color: #41B883;
    position: absolute;
    left: 0.7rem;
    top: 0.2rem;
  }
`;

const CheckboxContainer = styled.span`
  color: #3EB595;
  padding: 0.5rem 0.25rem;
  &:before {
    content: '\2713';
    display: block;
    text-align: center;
    color: #41B883;
    position: absolute;
    left: 0.7rem;
    top: 0.2rem;
  }
`;
