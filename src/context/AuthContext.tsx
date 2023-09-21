import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  User,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

type FirebaseUser = User;

// AuthContext의 타입 지정
type AuthContextType = {
  currentUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<void>; // 로그인 함수 추가
  logout: () => Promise<void>; // 로그아웃 함수 추가
  resetPassword: (email: string) => Promise<void>; // 비밀번호 재설정 함수
  googleLogin: () => Promise<void>; // 구글 로그인 함수 추가
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // 사용자 인증 상태를 추적하고 currentUser 값을 설정
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // 컨텍스트 값을 useMemo를 사용하여 메모이제이션
  const value = useMemo(() => {
    return {
      currentUser,
      login: async (email: string, password: string) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          // 로그인 실패 처리
          console.error("로그인 실패:", error);
          throw error;
        }
      },
      logout: async () => {
        // 로그아웃 함수 정의
        try {
          await auth.signOut();
        } catch (error) {
          console.error("로그아웃 실패:", error);
          throw error;
        }
      },
      resetPassword: async (email: string) => {
        try {
          await sendPasswordResetEmail(auth, email);
        } catch (error) {
          console.error("비밀번호 재설정 이메일 전송 실패:", error);
          throw error;
        }
      },
      googleLogin: async () => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
        } catch (error) {
          console.error("Google 로그인 실패:", error);
        }
      },
    };
  }, [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
