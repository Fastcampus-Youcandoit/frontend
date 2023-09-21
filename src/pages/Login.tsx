import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../assets/fonts/Font.css";
import googleIcon from "../assets/icons/login_icon/google_icon.png.png";
import {
  Button,
  ModalBackground,
  ModalBox,
} from "../components/gallery/GalleryModal";
import { useAuth } from "../context/AuthContext";
import { StylesProps } from "../types/userLog";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  > div {
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

export const HomeLink = styled(Link)`
  font: normal normal 90px "Cafe24Shiningstar";
  color: #000;
`;

export const Form = styled.form`
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

export const Input = styled.input`
  width: 500px;
  margin-bottom: 25px;
  padding: 3px 2px;
  font-family: "NotoSansKR-Medium";
  font-size: 20px;
  line-height: 36px;
  border: none;
  outline: none;
  border-bottom: 2px solid #b2b2b2;
  &::placeholder {
    color: #b2b2b2;
  }
`;

export const Message = styled.span`
  font-family: "NotoSansKR-Medium";
  font-size: 16px;
  line-height: 28pz;
  color: red;
  left: 0;
  margin-top: -15px;
  margin-bottom: 8px;
  text-align: left;
`;

export const LoginButton = styled.button<StylesProps>`
  margin-bottom: 5px;
  padding: 10px 0;
  border-radius: 2px;
  font-family: "NotoSansKR-Bold";
  font-size: 22px;
  line-height: 30px;
  color: ${props => props.color || "#000"};
  background-color: ${props => props.$backgroundColor || "#fff"};
  border: ${props => props.$backgroundColor || "1px solid #d4d4d4"};
  cursor: pointer;
  translate: transform 0.8s;
  > img {
    float: left;
    margin-left: 25px;
    margin-right: -53px;
    width: 28px;
    height: 28px;
  }
  &:hover {
    transform: scale(1.02);
    translate: transform 0.8s;
  }
`;

const Text = styled.span`
  display: flex;
  margin: 10px auto 5px auto;
  color: #d2d2d2;
`;

const Hr = styled.hr`
  width: 230px;
  height: 1px;
  size: 1.2px;
  background: #d2d2d2;
`;

const LinkWrapper = styled.div`
  margin-top: 25px;
  margin-right: 30px;
  > button {
    font-family: "NotoSansKR-Medium";
    font-size: 1rem;
    border: none;
    background: none;
    cursor: pointer;
  }
  > a {
    font-family: "NotoSansKR-Medium";
  }
`;

const StyledLink = styled(Link)`
  color: #000;
`;

const Span = styled.span`
  margin: 0 30px;
  color: #d2d2d2;
`;

const FindModal = styled(ModalBox)`
  width: 25vw;
  height: 20.2rem;
  display: flex;
  flex-direction: column;
  test-align: left;
  box-sizing: border-box;
`;

const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid #d2d2d2;
  text-align: left;
  > div {
    padding: 1.5rem 2.7rem;
    font-family: "NotoSansKR-Bold";
    font-size: 1.2rem;
  }
`;

const FindForm = styled.div`
  width: 100%;
  padding: 1rem 2.7rem;
  display: flex;
  flex-direction: column;
  > div:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 2.5rem;
  }
`;

const FindLabel = styled.label`
  margin: 1rem 0px;
  font-family: "NotoSansKR-Medium";
  font-size: 1rem;
  color: #000;
  &::after {
    content: "*";
    color: rgb(240, 61, 12);
    margin-left: 0.4rem;
  }
`;

const FindInput = styled.input`
  width: 100%;
  height: 100%;
  font-family: "NotoSansKR-Medium";
  font-size: 1rem;
  padding: 1rem;
  padding-left: 0.8rem;
  outline: none;
  border-radius: 10px;
  border: 1.8px solid #d2d2d2;
`;

const FindButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const FindButton = styled(Button)`
  margin-left: 1.2rem;
  box-shadow: 0px 2px 5px #00000029;
`;

const Login = () => {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [findEmail, setFindEmail] = useState<string | undefined>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const modalBackgroundRef = useRef<HTMLDivElement>(null);
  const { login, resetPassword, googleLogin } = useAuth(); // 현재 사용자 정보 가져오기
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e?.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFindEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindEmail(e.target.value);
  };

  // 로그인
  const handleLogin = async () => {
    try {
      if (email !== undefined && password !== undefined) {
        await login(email, password);
        alert(`로그인되었습니다.`);
        navigate("/");
      }
    } catch (error) {
      alert("이메일 또는 패스워드가 잘못 입력되었습니다.");
      setPassword("");
      console.error("로그인 실패:", error);
    }
  };

  // 구글 로그인
  const handleGoogleLogin = async () => {
    try {
      if (email !== undefined && password !== undefined) {
        await googleLogin();
        navigate("/");
      }
    } catch (error) {
      alert("로그인에 실패하였습니다.");
      console.error("로그인 실패:", error);
    }
  };

  // 비밀번호 찾기
  const handleFindPassword = async () => {
    try {
      if (email !== undefined) {
        await resetPassword(email);
        alert("메일 전송에 성공했습니다.");
        setFindEmail("");
        setIsModal(false);
      }
    } catch (error) {
      alert("메일 전송에 실패했습니다.");
      console.error("메일 전송 실패:", error);
      setFindEmail("");
    }
  };

  // click modal background
  const handleClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalBackgroundRef.current) {
      setIsModal(false);
    }
  };

  return (
    <>
      <Wrapper>
        <div>
          <HomeLink to="/">Youcandoit</HomeLink>
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleLogin();
            }}>
            <div>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {!email ||
                (!password && (
                  <Message>이메일과 패스워드 모두 입력해주세요.</Message>
                ))}

              <LoginButton
                color="#087EA4"
                $backgroundColor="#E6F7FF"
                type="submit">
                로그인
              </LoginButton>
              <Text>
                <Hr /> &nbsp;또는 &nbsp;&nbsp;
                <Hr />
              </Text>
              <LoginButton onClick={handleGoogleLogin} type="button">
                <img src={googleIcon} alt="google icon" />
                Google 로그인
              </LoginButton>
              <LinkWrapper>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("");
                    setIsModal(true);
                  }}>
                  비밀번호 찾기
                </button>
                <Span>|</Span>
                <StyledLink to="/signup">회원가입</StyledLink>
              </LinkWrapper>
            </div>
          </Form>
        </div>
      </Wrapper>

      {isModal && (
        <ModalBackground
          onClick={handleClickBackground}
          ref={modalBackgroundRef}>
          <FindModal>
            <Title>
              <div>비밀번호 찾기</div>
            </Title>
            <FindForm onSubmit={handleFindPassword}>
              <div>
                <FindLabel htmlFor="email">이메일</FindLabel>
                <FindInput
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  value={findEmail}
                  onChange={handleFindEmailChange}
                  required
                />
              </div>
              <FindButtonWrapper>
                <FindButton color="#808080" bordercolor="#fff" type="submit">
                  Cancel
                </FindButton>
                <FindButton
                  color="#087EA4"
                  bordercolor="#E6F7FF"
                  $backgroundColor="#E6F7FF"
                  type="submit">
                  Send
                </FindButton>
              </FindButtonWrapper>
            </FindForm>
          </FindModal>
        </ModalBackground>
      )}
    </>
  );
};

export default Login;
