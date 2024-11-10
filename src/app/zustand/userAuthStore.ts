import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: string | null; // 현재 로그인된 유저의 이름
  nickname: string | null; // 닉네임
  email: string | null; // 이메일
  address: string | null; // 주소
  phoneNumber: string | null; // 전화번호
  logIn: (user: {
    email: string;
    nickname: string;
    address?: string;
    phoneNumber?: string;
  }) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  nickname: null,
  email: null,
  address: null,
  phoneNumber: null,
  logIn: ({ email, nickname, address, phoneNumber }) =>
    set({
      isLoggedIn: true,
      user: email, // user에 이메일을 저장
      nickname,
      email,
      address: address ?? null, // address가 없으면 null로 설정
      phoneNumber: phoneNumber ?? null, // phoneNumber가 없으면 null로 설정
    }),
  logOut: () =>
    set({
      isLoggedIn: false,
      user: null,
      nickname: null,
      email: null,
      address: null,
      phoneNumber: null,
    }),
}));
