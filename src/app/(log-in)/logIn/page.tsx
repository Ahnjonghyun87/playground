"use client";

import CommonModal from "@/app/components/common/modal/CommonModal";
import browserClient from "@/app/utils/supabase/client";
import { useAuthStore } from "@/app/zustand/userAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface LogIn {
  email: string;
  password: string;
}

const LogInPage = () => {
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 관리
  useEffect(() => {
    setIsOpen(true);
  }, []);
  const closeModal = () => {
    setIsOpen(false);
    route.push("/"); // 모달 닫을 때 경로 변경
  };
  const route = useRouter();
  const { logIn } = useAuthStore();
  const { mutate } = useMutation({
    mutationFn: async (data: LogIn) => {
      const response = await fetch("/api/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // logIn 데이터를 API에 전송
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("로그인에 실패했습니다.");
      }
      return response.json();
    },
    onError: () => {
      alert("로그인에 실패했습니다.");
    },
    onSuccess: (data) => {
      // 응답에서 유저 정보를 추출 (예: email 또는 id)
      const user = data?.user?.email || "defaultUser"; // 응답에 따라 수정
      logIn(user); // 유저 정보를 logIn 함수에 전달
      alert("로그인에 성공했습니다.");
      route.push("/");
    },
  });

  const { register, handleSubmit, formState } = useForm<LogIn>({
    mode: "onChange",
    defaultValues: {
      email: "",

      password: "",
    },
  });

  const onSubmit = (data: LogIn) => {
    mutate(data);
  };

  async function signWithGitHub() {
    await browserClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.origin + "auth/callback",
      },
    });
    alert("깃허브 로그인에 성공했습니다");
  }
  return (
    <>
      {isOpen && (
        <CommonModal
          title="로그인"
          type="non-click"
          size="large"
          onClose={closeModal}
          content={
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid justify-center"
            >
              <div>
                <label htmlFor="email">이메일</label>
              </div>
              <div className="border rounded-xl mb-1 py-2">
                <input
                  {...register("email", {
                    required: "이메일은 필수 입력 항목입니다",
                  })}
                  placeholder="이메일을 입력하세요"
                  type="email"
                />
              </div>
              <div>
                {" "}
                {formState.errors.email && (
                  <span className="text-red-500">
                    {formState.errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="password">패스워드</label>
              </div>

              <div className="border rounded-xl mb-1 py-2">
                <input
                  {...register("password", {
                    required: "비밀번호는 필수 입력 항목입니다",
                  })}
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                />
              </div>
              <div>
                {" "}
                {formState.errors.password && (
                  <span className="text-red-500">
                    {formState.errors.password.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="flex items-center justify-center pt-4 border rounded-xl pb-4 text-2xl font-black"
              >
                log-in
              </button>
              <button
                type="button"
                className="flex items-center justify-center pt-4 border rounded-xl pb-4 text-2xl font-black"
                onClick={signWithGitHub}
              >
                깃허브 로그인
              </button>
            </form>
          }
        />
      )}
    </>
  );
};

export default LogInPage;
