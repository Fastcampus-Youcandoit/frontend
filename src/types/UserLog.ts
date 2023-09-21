import { useState, useRef } from "react";

export interface StyleProps {
  color?: string;
  background?: string;
}

export function useLogState() {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const modalBackgroundRef = useRef<HTMLDivElement>(null);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isModal,
    setIsModal,
    name,
    setName,
    passwordCheck,
    setPasswordCheck,
    emailMessage,
    setEmailMessage,
    nameMessage,
    setNameMessage,
    passwordMessage,
    setPasswordMessage,
    passwordCheckMessage,
    setPasswordCheckMessage,
    modalBackgroundRef,
  };
}
