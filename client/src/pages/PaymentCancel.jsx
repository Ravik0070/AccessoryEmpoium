import styled from "styled-components";
import { Link } from "react-router-dom";
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
  color: red;
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
const PaymentCancel = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Payment Canceled!</Title>
        <Message>
          Your payment has been canceled due to some inconvinience. try again.
        </Message>
        <Link style={{textDecoration:"none"}} to="/">
          <Button>Go to Home</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default PaymentCancel;
