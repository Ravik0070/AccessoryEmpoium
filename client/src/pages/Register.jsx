import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Links = styled.span`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  font-size: 14px;
  color: red;
  cursor: pointer;
`;
const Center = styled.div`
`;
const Logo = styled.h2`
  font-weight: bold;
  ${mobile({ fontSize: "15px" })}
`;
const Register = () => {
  const [formDetails, setFormDetails] = useState({});
  const [isError, setIsError] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isPaswordConfirmed =
      formDetails["confirmPassword"] === formDetails["password"];
    if (isPaswordConfirmed) {
      const { confirmPassword, ...newData } = formDetails;
      const res = await publicRequest.post("/auth/register", newData);
      res ? navigate("/login") : setIsError(true);
    } else {
      setIsError(true);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };
  return (
    <Container>
       <Center>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <Logo>Accessory Emporium</Logo>
          </Link>
        </Center>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="name"
            name="name"
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
        {isError && <Error>Something went wrong!</Error>} <br />
        <Link style={{ textDecoration: "none", color: "black" }} to="/login">
          <Links>SIGN IN ? </Links>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
