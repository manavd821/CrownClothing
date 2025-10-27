import styled from "styled-components";
import {BaseButton, GoogleSignInButton, InvertedButton} from '../button/button.styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: #1f1f1f;
  top: 90px;
  right: 40px;
  z-index: 5;
  overflow-y: auto;
  overflow-x: hidden;

  ${BaseButton}, ${GoogleSignInButton}, ${InvertedButton} {
    margin-top: auto;
    font-size: 10px;
  }
`;
export const EmptyMessage = styled.div`
    font-size: 18px;
    margin: 50px auto;
  
`;
export const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;
export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;

  img {
    width: 30%;
  }
`;
export const ItemDetails = styled(CartItemContainer)`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 20px;

`;
export const Name = styled.span`
  font-size: 13px;
`;
export const Price = styled.span`
  font-size: 13px;
`;
