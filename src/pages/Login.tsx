import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../assets/fonts/Font.css";
import googleIcon from "../assets/icons/login_icon/google_icon.png.png";
import { useAuth } from "../context/AuthContext";
import {
  ModalBackground,
  ModalBox,
  Button,
} from "../components/gallery/GalleryModal";
import "../assets/fonts/Font.css";
import { useLogState, StyleProps } from "../types/UserLog";

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
  font: normal normal bold 20px/36px Noto Sans KR;
  border: none;
  outline: none;
  border-bottom: 2px solid #b2b2b2;
  &::placeholder {
    color: #b2b2b2;
  }
`;

export const Message = styled.span`
  font: normal bold 16px/28px Noto Sans KR;
  color: red;
  left: 0;
  margin-top: -15px;
  margin-bottom: 5px;
  text-align: left;
`;

export const LoginButton = styled.button<StyleProps>`
  margin-bottom: 5px;
  padding: 10px 0;
  border-radius: 2px;
  font: normal normal bold 22px Noto Sans KR;
  color: ${props => props.color || "#000"};
  background-color: ${props => props.background || "#fff"};
  border: ${props => props.background || "1px solid #d4d4d4"};
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
  color: gray;
`;

const Hr = styled.hr`
  width: 230px;
  height: 1px;
  size: 1.2px;
`;

const LinkWrapper = styled.div`
  margin-top: 20px;
  > button {
    font-size: 1rem;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  color: #000;
`;

const Span = styled.span`
  margin: 0 30px;
  color: #808080;
`;

const StyledModal = styled(ModalBox)`
  width: 45rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FindMessage = styled.label`
  font-family: "NotoSansKR-Bold";
  font-size: 1.4rem;
  margin-bottom: 4rem;
`;

const FindButton = styled(Button)`
  margin-top: 2.5rem;
  margin-left: auto;
  margin-right: 1.5rem;
`;

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isModal,
    setIsModal,
    modalBackgroundRef,
  } = useLogState();
  const { login, resetPassword, googleLogin } = useAuth(); // 현재 사용자 정보 가져오기
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e?.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
        setIsModal(false);
      }
    } catch (error) {
      alert("메일 전송에 실패했습니다.");
      console.error("메일 전송 실패:", error);
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

              <LoginButton color="#087EA4" background="#E6F7FF" type="submit">
                로그인
              </LoginButton>
              <Text>
                <Hr />
                {"\u00A0 또는 \u00A0"}
                <Hr />
              </Text>
              <LoginButton onClick={handleGoogleLogin} type="button">
                <img src={googleIcon} alt="google icon" />
                Google 로그인
              </LoginButton>
              <LinkWrapper>
                <button type="button" onClick={() => setIsModal(true)}>
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
          <StyledModal>
            <FindMessage htmlFor="email">
              비밀번호 재설정 메일을 보내기 위한 이메일을 입력해주세요.
            </FindMessage>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={handleEmailChange}
            />
            <FindButton
              bordercolor="#000"
              type="button"
              onClick={handleFindPassword}>
              SEND
            </FindButton>
          </StyledModal>
        </ModalBackground>
      )}
    </>
  );
};

export default Login;
