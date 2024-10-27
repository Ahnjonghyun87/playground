"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import browserClient from "../utils/supabase/client";
import { useAuthStore } from "../zustand/userAuthStore";

const HeaderLayoutPage = () => {
  const { isLoggedIn, logOut, logIn } = useAuthStore();
  const route = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, error } = await browserClient.auth.getSession();
      if (data?.session) {
        const email = data.session.user.email;
        // email이 존재할 때만 logIn 호출
        if (email) {
          logIn(email);
        } else {
          console.error("User email is undefined");
        }
      } else {
        logOut();
      }
    };

    checkSession();
  }, [logIn, logOut]);

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/logOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // 로그아웃이 성공하면 상태 업데이트
        logOut();
        alert("로그아웃 되었습니다.");
        route.push("/");
      } else {
        const data = await response.json();
        alert(data.message || "로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };
  const handleLogIn = () => {
    route.push("logIn");
  };
  const handleSignUp = () => {
    route.push("signUp");
  };
  const handleGeckoInform = () => {
    route.push("reptileInform");
  };

  return (
    <main className="fixed z-50 w-full flex justify-between bg-amber-500">
      <div className="p-5 border rounded-xl">오늘의 날씨:</div>
      <div className="p-4 flex space-x-4">
        {isLoggedIn ? (
          <div className="p-4 cursor-pointer group relative">
            메뉴
            <ul className="absolute hidden group-hover:flex flex-row bg-white cursor-pointer tracking-wide border rounded-xl p-2 right-0 left-auto">
              <li className="hover:text-amber-700 px-4 whitespace-nowrap">
                마이페이지
              </li>
              <li
                className="hover:text-amber-700 px-4 whitespace-nowrap"
                onClick={handleGeckoInform}
              >
                개체등록
              </li>
              <li className="hover:text-amber-700 px-4 whitespace-nowrap">
                개체관리
              </li>
              <li className="hover:text-amber-700 px-4 whitespace-nowrap">
                게시판
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <button type="button" onClick={handleLogOut}>
            log-out
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleLogIn}
              className="border rounded-xl p-2"
            >
              log-in
            </button>{" "}
            <button
              type="button"
              onClick={handleSignUp}
              className="border rounded-xl p-2"
            >
              sign-up
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default HeaderLayoutPage;
