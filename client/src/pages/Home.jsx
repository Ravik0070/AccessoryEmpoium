import Categories from "../components/Categories";
import Products from "../components/Products";
import styled from "styled-components";
import { mobile } from "../responsive";

const Hr = styled.hr`
  height: 4px;
  background-color: lightgray;
  border: none;
  ${mobile({ marginTop: "10%" })};
`;
const Heading2 = styled.h2`
  text-align: center;
  margin-top: 20px;
`;
const Home = () => {
  return (
    <div>
      <Categories />
      <Hr />
      <Heading2>Trendings</Heading2>
      <Products />
    </div>
  );
};

export default Home;
