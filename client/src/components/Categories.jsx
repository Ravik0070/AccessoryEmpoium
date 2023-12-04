import styled from "@emotion/styled";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const categories = [
  {
    id: 1,
    category_name: "Mobile Covers",
    image:
      "https://images.pexels.com/photos/7742544/pexels-photo-7742544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cat: "mobile-covers",
  },
  {
    id: 4,
    category_name: "SmartWatch Bands",
    image:
      "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cat: "smartwatch-bands",
  },
  {
    id: 2,
    category_name: "Key-Chains",
    image:
      "https://i.etsystatic.com/25912741/r/il/534321/3425942546/il_794xN.3425942546_54bs.jpg",
    cat: "key-chains",
  },
  {
    id: 3,
    category_name: "Phone Grips",
    image:
      "https://www.grootgadgets.com/wp-content/uploads/2018/11/Batman-Popsocket-Phone-Grip-stand-600x600.png",
    cat: "phone-grip",
  },
];

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;
const Categories = () => {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem item={category} key={category.id} />
      ))}
    </Container>
  );
};

export default Categories;
