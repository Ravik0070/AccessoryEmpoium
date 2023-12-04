import styled from "styled-components";
import {
  Search,
  ShoppingBagOutlined,
  Person2Rounded,
  ExitToApp,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { persistor } from "../redux/store";
import { emptyCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({
    height: "50px",
  })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h2`
  font-weight: bold;
  ${mobile({ fontSize: "15px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  color: black;
  ${mobile({ fontSize: "11px", marginLeft: "10px" })}
`;
const Button = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  margin-left: 20px;
  color: red;
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    persistor.purge();
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search"></Input>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <Logo>Accessory Emporium</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <>
              <Link to={`/my-details/${user._id}`} style={{ textDecoration: "none" }}>
                <MenuItem>
                  <Person2Rounded
                    style={{
                      color: "white",
                      backgroundColor: "teal",
                      borderRadius: "50%",
                    }}
                  />
                </MenuItem>
              </Link>
              <Button onClick={handleLogout}>
                <ExitToApp />
              </Button>
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <MenuItem>SIGNIN</MenuItem>
              </Link>
            </>
          )}
          <Link to={"/cart/"} style={{ textDecoration: "none" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingBagOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
