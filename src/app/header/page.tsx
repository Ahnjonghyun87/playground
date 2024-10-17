"use client";

import { useRouter } from "next/navigation";
import SignUpPage from "../(log-in)/signUp/page";
import { useModal } from "../context/modal.context";
import { useAuthStore } from "../zustand/userAuthStore";

const HeaderLayoutPage = () => {
  const modal = useModal();
  const { isLoggedIn, logOut } = useAuthStore();
  const route = useRouter();

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
    modal.open({
      title: "Sign Up",
      content: <SignUpPage />,
    });
  };
  return (
    <main className="fixed py-2 z-50 w-full flex justify-between px-4 bg-amber-500">
      <div className="p-4">오늘의 날씨:</div>
      <div className="p-4 flex space-x-4">
        {isLoggedIn ? (
          <button type="button" onClick={handleLogOut}>
            log-out
          </button>
        ) : (
          <div>
            <button type="button" onClick={handleLogIn}>
              log-in
            </button>{" "}
            <button type="button" onClick={handleSignUp}>
              sign-up
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default HeaderLayoutPage;
