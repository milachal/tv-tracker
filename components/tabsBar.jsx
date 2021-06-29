import styled from 'styled-components';

const TabsBar = ({ onClick, tabTitle }) => (
  <TabsContainer>
    <Button onClick={onClick}>{tabTitle}</Button>
  </TabsContainer>
);

export default TabsBar;

const TabsContainer = styled.div`
  display: inline-block;
`;

const Button = styled.button`
  border: none;
  color: #ffffff;
  background-color: #3EB595;
  padding: 20px 25px; 
  font-size: 20px;
  margin: 5px;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
    background-color: #71b0bf;
    cursor: pointer;
  }
  &:active {
    background-color: #011C26;
  }
`;
