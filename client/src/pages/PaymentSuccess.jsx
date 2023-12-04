import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../redux/cartRedux";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;
const Wrapper = styled.div`
  width: 40vw;
  margin: 10vh 0;
  background-color: #e6e3e3;
  text-align: center;
  padding: 25px;
  border-radius: 10px;
  line-height: 40px;
`;
const Title = styled.h1`
  font-size: 25px;
  color: green;
`;
const Message = styled.div`
  font-size: 16px;
`;
const Button = styled.button`
  border: none;
  border-radius: 10px;
  background-color: black;
  color: white;
  font: 16px;
  padding: 8px 10px;
`;
const PaymentSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyCart());
  });
  return (
    <Container>
      <Wrapper>
        <Title>Payment Successfully done!</Title>
        <Message>
          We've verified your order and you will be updated for its recieving
          date.
        </Message>
        <Link to="/">
          <Button>SHOP MORE</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default PaymentSuccess;
