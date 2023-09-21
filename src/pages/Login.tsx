import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../assets/fonts/Font.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googleIcon from "../assets/icons/login_icon/google_icon.png.png";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

interface StyleProps {
  color?: string;
  backgroundColor?: string;
}

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
    > span {
      font: normal normal 90px "Cafe24Shiningstar";
    }
  }
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
  border-bottom: 2px solid #808080;
  &::placeholder {
    color: #808080;
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

export const Button = styled.button<StyleProps>`
  margin-bottom: 5px;
  padding: 10px 0;
  border-radius: 2px;
  font: normal normal bold 22px Noto Sans KR;
  color: ${props => props.color || "#000"};
  background-color: ${props => props.backgroundColor || "#fff"};
  border: ${props => props.backgroundColor || "1px solid #d4d4d4"};
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
  const { currentUser, login, googleLogin } = useAuth(); // 현재 사용자 정보 가져오기
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const navigate = useNavigate();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e?.target.value);
  };
  // 1.이메일 유효성검사
  // 영문과 이메일 형식
  const checkEmailValidation = (value: string) => {
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

    const EMAIL_ERROR_MSG = {
      required: "필수 정보입니다.",
      invalid: "이메일 형식을 맞춰서 입력해주세요.",
    };
    let isValidEmail;
    if (value.length === 0) {
      isValidEmail = "required";
    } else {
      isValidEmail = EMAIL_REGEX.test(value) ? true : "invalid";
    }
    if (isValidEmail !== true) {
      setEmailMessage(
        EMAIL_ERROR_MSG[isValidEmail as keyof typeof EMAIL_ERROR_MSG],
      );
    } else {
      setEmailMessage("");
    }
  };

  // 3. 비밀번호 유효성 검사
  const checkPwValidation = (value: string) => {
    const PW_REGEX = /^[a-zA-Z0-9]{8,16}$/;

    const PW_ERROR_MSG = {
      required: "필수 정보입니다.",
      invalid: "8~16자 영문 소/대문자, 숫자를 입력해주세요.",
    };
    let isValidPw;
    if (value.length === 0) {
      isValidPw = "required";
    } else {
      isValidPw = PW_REGEX.test(value) ? true : "invalid";
    }

    if (isValidPw !== true) {
      setPasswordMessage(PW_ERROR_MSG[isValidPw as keyof typeof PW_ERROR_MSG]);
    } else {
      setPasswordMessage("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (email !== (undefined && "") && password !== (undefined && "")) {
        await login(email, password);
        const userName = currentUser?.displayName;
        alert(`로그인되었습니다.`);
        navigate("/");
      }
    } catch (error) {
      alert("이메일 또는 패스워드가 잘못 입력되었습니다.");
      console.error("로그인 실패:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (email !== undefined && password !== undefined) {
        await googleLogin();
        // alert(`${userName} 님, 환영합니다`);
        navigate("/");
      }
    } catch (error) {
      alert("로그인에 실패하였습니다.");
      console.error("로그인 실패:", error);
    }
  };
  return (
    <Wrapper>
      <div>
        <span>Youcandoit</span>
        <Form>
          <div>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleEmailChange}
              onBlur={e => checkEmailValidation(e?.target.value)}
              required
            />
            <Message>{emailMessage}</Message>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
              onBlur={e => checkPwValidation(e?.target.value)}
              required
            />
            <Message>{passwordMessage}</Message>

            <Button
              onClick={e => {
                e.preventDefault();
                handleLogin();
              }}
              color="#087ea4"
              backgroundColor="#e6f7ff"
              type="submit">
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
