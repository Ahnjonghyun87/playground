"use client";

import { useAuthStore } from "@/app/zustand/userAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LogIn {
  email: string;
  password: string;
}

const LogInPage = () => {
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
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid justify-center py-16"
    >
      <div className="border rounded-xl mb-1">
        <label htmlFor="email">이메일</label>
        <input
          {...register("email", {})}
          placeholder="이메일을 입력하세요"
          type="email"
        ></input>
        {formState.errors.email && (
          <span>{formState.errors.email.message}</span>
        )}
      </div>

      <div className="border rounded-xl mb-1">
        <label htmlFor="password">패스워드</label>
        <input
          {...register("password", { required: true })}
          placeholder="비밀번호를 입력하세요"
          type="password"
        ></input>
        {formState.errors.password && (
          <span>{formState.errors.password.message}</span>
        )}
      </div>
      <button type="submit">log-in</button>
    </form>
  );
};

export default LogInPage;
