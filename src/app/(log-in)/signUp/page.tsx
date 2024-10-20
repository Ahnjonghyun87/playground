"use client";

import CommonModal from "@/app/components/common/modal/CommonModal";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SignUp {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const SignUpPage = () => {
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 관리
  const router = useRouter();
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    router.push("/"); // 모달 닫을 때 경로 변경
  };
  const { mutate } = useMutation({
    mutationFn: async (data: SignUp) => {
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // SignUp 데이터를 API에 전송
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }
      return response.json();
    },
    onError: () => {
      alert("회원 가입에 실패했습니다.");
    },
    onSuccess: () => {
      alert("회원 가입에 성공했습니다.");
      closeModal();
    },
  });

  const { register, handleSubmit, formState, watch } = useForm<SignUp>({
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
    },
  });
  const password = watch("password");
  const onSubmit = (data: SignUp) => {
    mutate(data);
  };
  return (
    <>
      {isOpen && (
        <CommonModal
          title={"회원가입"}
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
                    required: { value: true, message: "이메일이 필요합니다" },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "유효하지 않은 이메일주소입니다",
                    },
                  })}
                  placeholder="이메일을 입력하세요"
                  type="email"
                ></input>
              </div>{" "}
              {formState.errors.email && (
                <span className="text-red-500">
                  {formState.errors.email.message}
                </span>
              )}
              <div>
                <label htmlFor="nickname">닉네임</label>
              </div>
              <div className="border rounded-xl mb-1 py-2">
                <input
                  {...register("nickname", { required: "닉네임은 필수입니다" })}
                  placeholder="닉네임을 입력하세요"
                  type="text"
                ></input>
              </div>{" "}
              {formState.errors.nickname && (
                <span className="text-red-500">
                  {formState.errors.nickname.message}
                </span>
              )}
              <div>
                <label htmlFor="password">비밀번호</label>
              </div>
              <div className="border rounded-xl mb-1 py-2">
                <input
                  {...register("password", {
                    required: "비밀번호는 필수입니다",
                  })}
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                ></input>
              </div>{" "}
              {formState.errors.password && (
                <span className="text-red-500">
                  {formState.errors.password.message}
                </span>
              )}
              <div>
                <label htmlFor="confirmPassword">비밀번호 확인</label>
              </div>
              <div className="border rounded-xl mb-1 py-2">
                <input
                  {...register("confirmPassword", {
                    required: "비밀번호 확인은 필수입니다.",
                    validate: (value) =>
                      value === password || "비밀번호가 일치하지 않습니다.",
                  })}
                  type="password"
                  placeholder="비밀번호 확인"
                  className="input"
                />
              </div>{" "}
              {formState.errors.confirmPassword && (
                <span className="error text-red-500">
                  {formState.errors.confirmPassword.message}
                </span>
              )}
              <button
                type="submit"
                className="flex items-center justify-center pt-4 border rounded-xl pb-4 text-2xl font-black"
              >
                회원가입신청
              </button>
            </form>
          }
          type={"non-click"}
          size="large"
          onClose={closeModal}
        >
          {" "}
        </CommonModal>
      )}
    </>
  );
};

export default SignUpPage;
