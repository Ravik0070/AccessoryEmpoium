import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { updateUserData } from "../redux/userRedux";
import moment from "moment/moment";
import { Cancel, CheckBox } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const PersonalDetails = styled.div`
  padding: 10px 20px;
  background-color: teal;
  color: white;
  width: 45%;
  height: 200px;
  border-radius: 7px;
  position: relative;
`;
const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;
const H1 = styled.h1`
  font-size: 25px;
`;
const H2 = styled.h2`
  font-size: 20px;
`;
const Code = styled.code`
  font-size: 20px;
  font-weight: bold;
`;
const Address = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  width: 45%;
  height: 200px;
  border-radius: 7px;
  overflow-y: scroll;
`;
const P = styled.p`
  font-size: 15px;
  font-weight: bold;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  border: none;
  font-size: 20px;
  color: teal;
  background-color: whitesmoke;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-top: 20px;
`;

const Orders = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
`;
const Table = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 7px 7px 0 0;
  overflow: hidden;
`;
const Thead = styled.thead``;
const Th = styled.th`
  display: flex;
  justify-content: center;
  background-color: teal;
  text-align: center;
  padding: 9px 0;
  font-size: 19px;
  color: white;
`;
const Tbody = styled.tbody`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Tr = styled.tr`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid teal;
  background-color: #f4f1f1;
`;
const Td = styled.td`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;
const Ul = styled.ul`
  list-style: none;
  gap: 20px;
`;
const Li = styled.li`
  font-weight: 300;
  text-align: start;
`;
const Input = styled.input`
  border: none;
  outline: none;
  font-size: 20px;
`;
const UserDetail = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [userData, setUserData] = useState(user);
  const [isEditMode, setIsEditMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    setIsEditMode(false);
    const res = userRequest.put(`/user/${user._id}`, userData);
    console.log(res.data);
    dispatch(updateUserData(userData));
  };
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/order/find/${user._id}`);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  return (
    <Container>
      <Wrapper>
        <PersonalDetails>
          <Row>
            <H1>Name&nbsp;:&nbsp;&nbsp;</H1>
            {isEditMode ? (
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder={user.name}
              ></Input>
            ) : (
              <H2>{user.name}</H2>
            )}
          </Row>
          <Row>
            <H1>UserName&nbsp;:&nbsp;&nbsp;</H1>
            {isEditMode ? (
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder={user.username}
              ></Input>
            ) : (
              <H2>{user.username}</H2>
            )}
          </Row>
          <Row>
            <H1>Email&nbsp;:&nbsp;&nbsp;</H1>
            {isEditMode ? (
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder={user.email}
              ></Input>
            ) : (
              <Code>{user.email}</Code>
            )}
          </Row>
        </PersonalDetails>
        <Address>
          <Row>
            <H1>Current Address&nbsp;:&nbsp;&nbsp; </H1>
          </Row>
          <Row>
            {isEditMode ? (
              <Input
                onChange={handleChange}
                placeholder={user.address}
                style={{ width: "100%" }}
                name="address"
              ></Input>
            ) : (
              <P style={{ fontStyle: "italic", fontWeight: "500" }}>
                {user.address ? user.address : "No Addresss is added"}
              </P>
            )}
          </Row>
        </Address>
      </Wrapper>
      <ButtonWrapper>
        {!isEditMode && (
          <Button onClick={() => setIsEditMode(true)}>Edit</Button>
        )}
        {isEditMode && (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button
              onClick={() => setIsEditMode(false)}
              style={{ color: "white", backgroundColor: "red" }}
            >
              cancel
            </Button>
          </>
        )}
      </ButtonWrapper>
      <Orders>
        <Table>
          <Thead>
            <Tr style={{ display: "flex", borderRadius: "7px 7px 0 0" }}>
              <Th style={{ width: "10%" }}>Status</Th>
              <Th style={{ width: "20%" }}>OrderId</Th>
              <Th style={{ width: "45%" }}>Items</Th>
              <Th style={{ width: "12%" }}>Amount</Th>
              <Th style={{ width: "13%" }}>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td style={{ width: "10%" }}>
                  {order.status === "completed" ? (
                    <CheckBox style={{ color: "green" }} />
                  ) : (
                    <Cancel style={{ color: "red" }} />
                  )}
                </Td>
                <Td style={{ width: "20%", fontWeight: "500" }}>
                  {order.orderId}
                </Td>
                <Td style={{ width: "45%" }}>
                  <Ul>
                    {order.products.map((item) => (
                      <Li key={item.productId}>
                        <strong>#</strong> <i>{item.name}</i>{" "}
                        <strong> x {item.quantity}</strong>
                      </Li>
                    ))}
                  </Ul>
                </Td>
                <Td style={{ width: "12%", fontSize: "15px" }}>
                  &#8377;{order.amount / 100}
                </Td>
                <Td style={{ width: "13%" }}>
                  {moment(order.updatedAt).format("DD/MM/YYYY")}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Orders>
    </Container>
  );
};

export default UserDetail;
