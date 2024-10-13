"use client";

import { useAuthStore } from "../zustand/userAuthStore";

const HeaderLayoutPage = () => {
  const { isLoggedIn, logOut } = useAuthStore();
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
      } else {
        const data = await response.json();
        alert(data.message || "로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };
  return (
    <main className="fixed py-2 z-50 w-full flex justify-between px-4">
      <div className="p-4">오늘의 날씨:</div>
      <div className="p-4 flex space-x-4">
        {isLoggedIn ? (
          <div>
            <button>log-in</button> <button>sign-up</button>
          </div>
        ) : (
          <button onClick={handleLogOut}>log-out</button>
        )}
      </div>
    </main>
  );
};

export default HeaderLayoutPage;
