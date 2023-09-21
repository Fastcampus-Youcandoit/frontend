import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  height: 83vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  font-size: 2rem;
  font-family: "NotoSansKR-medium";
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 1rem 1rem;
  background-color: rgb(51, 106, 248);
  color: #fff;
  font-family: "NotoSansKR-medium";
  border: none;
  cursor: pointer;
  width: 20rem;
  border-radius: 12px;
`;

const ErrorNum = styled.div`
  font-size: 3rem;
  font-family: "NotoSansKR-bold";
`;

const StyledLink = styled(Link)`
  color: #000;
`;

const NotFound = () => {
  return (
    <Wrap>
      <Header />
      <Box>
        <ErrorNum>404 Not Found</ErrorNum>
        <div>요청하신 페이지를 찾을 수 없어요.</div>
        <div>올바른 주소로 접속 하셨나요?</div>
        <StyledLink to="/">
          <Button type="button">홈으로 돌아가기</Button>
        </StyledLink>
      </Box>
      <Footer />
    </Wrap>
  );
};

export default NotFound;
