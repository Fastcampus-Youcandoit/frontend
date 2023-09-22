import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { Form, HomeLink, Input, LoginButton, Message, Wrapper } from "./Login";
import "../assets/fonts/Font.css";

const StyledForm = styled(Form)`
  height: 35rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom: 10px;
  input {
    width: 100%;
    padding: 3px 2px;
    border: none;
    border-bottom: 2px solid #b2b2b2;
    outline: none;
    font-family: "NotoSansKR-Medium";
    font-size: 1rem;
    font-size: 1.25rem;
    &::placeholder {
      color: #b2b2b2;
    }
  }
`;

const Signup = () => {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [name, setName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const navigate = useNavigate();

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

  // 2. 이름 유효성 검사
  // 영문 소문자, 대문자, 한글만 가능
  const checkNameValidation = (value: string) => {
    const NAME_REGEX = /^[가-힣a-zA-Z]{2,}([·•]?[가-힣a-zA-Z]+)*$/;
    const NAME_ERROR_MSG = {
      required: "필수 정보입니다.",
      invalid: "이름 형식이 올바르지 않습니다.",
    };
    let isValidName;
    if (value.length === 0) {
      isValidName = "required";
    } else {
      isValidName = NAME_REGEX.test(value) ? true : "invalid";
    }

    if (isValidName !== true) {
      setNameMessage(
        NAME_ERROR_MSG[isValidName as keyof typeof NAME_ERROR_MSG],
      );
    } else {
      setNameMessage("");
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

  // 4. 비밀번호 확인 유효성 검사
  const checkPwCheckValidation = (value: string) => {
    const PW_CHECK_ERROR_MSG = {
      required: "필수 정보입니다.",
      invalid: "비밀번호가 일치하지 않습니다.",
    };
    let isValidPwCheck;
    if (value.length === 0) {
      isValidPwCheck = "required";
    } else {
      isValidPwCheck = password === value ? true : "invalid";
    }

    if (isValidPwCheck !== true) {
      setPasswordCheckMessage(
        PW_CHECK_ERROR_MSG[isValidPwCheck as keyof typeof PW_CHECK_ERROR_MSG],
      );
    } else {
      setPasswordCheckMessage("");
    }
  };

  // 회원가입
  const createUser = (authInstance: Auth) => {
    if (email !== undefined && password !== undefined) {
      createUserWithEmailAndPassword(authInstance, email, password)
        .then(userCredential => {
          const { user } = userCredential;
          if (user) {
            updateProfile(user, {
              displayName: name,
            }).then(() => {
              alert(`${user.displayName} 님, 환영합니다`);
              setName("");
              setEmail("");
              setPassword("");
              setPassword("");
              setPasswordCheck("");
              navigate("/");
            });
          }
        })
        .catch((error: { code: any }) => {
          const EMAIL_DUPLICATE_ERROR_CODE = "auth/email-already-in-use";
          const errorCode = error.code;

          if (errorCode === EMAIL_DUPLICATE_ERROR_CODE) {
            alert("중복된 이메일이 존재합니다.");
          }
        });
    }
  };

  // 전체 유효성검사
  const handleSignUp = () => {
    if (
      emailMessage === "" &&
      nameMessage === "" &&
      passwordMessage === "" &&
      passwordCheckMessage === "" &&
      passwordCheck !== ""
    ) {
      // 모든 조건이 만족하면 회원가입
      createUser(auth);
    } else {
      // 어떤 조건이라도 만족하지 않으면 경고 메시지 표시
      alert("모든 항목을 올바르게 입력하세요.");
    }
  };
  return (
    <Wrapper>
      <div>
        <HomeLink to="/">Youcandoit</HomeLink>
        <StyledForm>
          <div>
            <InputWrapper>
              <label htmlFor="email">이메일</label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                autoFocus
                onChange={e => setEmail(e?.target.value)}
                onBlur={e => checkEmailValidation(e?.target.value)}
                required
              />
              <Message>{emailMessage}</Message>
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="name">이름</label>
              <Input
                id="name"
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={e => setName(e?.target.value)}
                onBlur={e => checkNameValidation(e?.target.value)}
              />
              <Message>{nameMessage}</Message>
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="password">비밀번호</label>
              <Input
                id="password"
                type="password"
                placeholder="8~16자 영문 소/대문자, 숫자를 입력해주세요."
                value={password}
                onChange={e => setPassword(e?.target.value)}
                onBlur={e => checkPwValidation(e?.target.value)}
              />
              <Message>{passwordMessage}</Message>
            </InputWrapper>

            <InputWrapper>
              <label htmlFor="passwordCheck">비밀번호 확인</label>
              <Input
                id="passwordCheck"
                type="password"
                placeholder="비밀번호를 똑같이 입력해주세요."
                value={passwordCheck}
                onChange={e => setPasswordCheck(e?.target.value)}
                onBlur={e => checkPwCheckValidation(e?.target.value)}
              />
              <Message>{passwordCheckMessage}</Message>
            </InputWrapper>
            <LoginButton
              color="#087ea4"
              background="#e6f7ff"
              onClick={() => handleSignUp()}
              type="button">
              회원가입
            </LoginButton>
          </div>
        </StyledForm>
      </div>
    </Wrapper>
  );
};
export default Signup;
