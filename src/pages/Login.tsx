import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../assets/fonts/Font.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import googleIcon from "../assets/icons/login_icon/google_icon.png.png";

interface StyleProps {
  color?: string;
  backgroundColor?: string;
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  > div {
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    > span {
      font: normal normal 90px "Cafe24Shiningstar";
    }
  }
`;

const Form = styled.form`
  width: 600px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0px 3px 6px #00000029;
  border: 2px solid #d2d2d2;
  border-radius: 5px;
  > div {
    width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Input = styled.input`
  width: 500px;
  margin-bottom: 25px;
  padding: 3px 2px;
  font: normal normal bold 20px/36px Noto Sans KR;
  border: none; /* 모든 테두리 제거 */
  border-bottom: 2px solid #808080; /* 밑줄 스타일 및 색상 설정 */
  &::placeholder {
    color: #808080;
  }
`;

const Message = styled.span`
  font: normal bold 16px/28px Noto Sans KR;
  color: red;
  left: 0;
  margin-top: -15px;
  margin-bottom: 5px;
  text-align: left;
`;

const Button = styled.button<StyleProps>`
  margin-bottom: 5px;
  padding: 10px 0;
  border-radius: 2px;
  font: normal normal bold 22px Noto Sans KR;
  color: ${props => props.color || "#000"};
  background-color: ${props => props.backgroundColor || "#fff"};
  border: ${props => props.backgroundColor || "1px solid #d4d4d4"};
  cursor: pointer;
  > img {
    float: left;
    margin-left: 25px;
    margin-right: -50px;
    width: 25px;
    height: 25px;
  }
`;

const Text = styled.span`
  display: flex;
  margin: 10px auto 5px auto;
  color: gray;
`;

const Hr = styled.hr`
  width: 230px;
  height: 1px;
  size: 1.2px;
`;

const LinkWrapper = styled.div`
  margin-top: 15px;
`;

const StyledLink = styled(Link)`
  color: #000;
`;

const Span = styled.span`
  margin: 0 20px;
  color: #808080;
`;

const Login = () => {
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // Check if credential is not null before accessing accessToken
        const token = credential ? credential.accessToken : "";
        console.log(result);
        // Use object destructuring for user
        const { user } = result;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        alert("로그인되었습니다");
      })
      .catch(error => {
        console.log(error);
        // Handle Errors here.
        const { code, message, customData } = error; // Use object destructuring
        const { email } = customData; // Use object destructuring
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <Wrapper>
      <div>
        <span>Youcandoit</span>
        <Form>
          <div>
            <Input type="email" placeholder="이메일을 입력하세요" />
            <Input type="password" placeholder="비밀번호를 입력하세요" />
            <Message>아이디 또는 비밀번호를 확인해주세요</Message>
            <Button color="#087ea4" backgroundColor="#e6f7ff" type="button">
              로그인
            </Button>
            <Text>
              <Hr />
              {"\u00A0 또는 \u00A0"}
              <Hr />
            </Text>
            <Button onClick={() => handleGoogleLogin()} type="button">
              <img src={googleIcon} alt="google icon" />
              Google 로그인
            </Button>
            <LinkWrapper>
              <StyledLink to="/login">비밀번호 찾기</StyledLink>
              <Span>|</Span>
              <StyledLink to="/login">아이디 찾기</StyledLink>
              <Span>|</Span>
              <StyledLink to="/signup">회원가입</StyledLink>
            </LinkWrapper>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Login;
