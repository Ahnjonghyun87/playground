import { POST } from "@/app/apis/signUp/route";

import { useForm } from "react-hook-form";
import { useMutation } from "../../../../node_modules/@tanstack/react-query/src/useMutation";

interface SignUp {
  email: string;
  password: string;
  nickname: string;
}

const SignUpPage = () => {
  const { mutate } = useMutation({
    mutationFn: POST,
    onError: () => {
      alert("회원 가입에 실패했습니다.");
    },
    onSuccess: () => {
      alert("회원 가입에 성공했습니다.");
    },
  });

  const { register, handleSubmit, formState } = useForm<SignUp>({
    mode: "onChange",
    defaultValues: {
      email: "adcd@email.com",
      nickname: "",
      password: "1234abcd",
    },
  });

  const onSubmit = (value: SignUp) => {
    mutate(value);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("email", {
            required: { value: true, message: "이메일이 필요합니다" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          placeholder="이메일을 입력하세요"
          type="email"
        ></input>
        {formState.errors.email && (
          <span>{formState.errors.email.message}</span>
        )}
      </div>
      <div>
        <input
          {...register("nickname", { required: true })}
          placeholder="닉네임을 입력하세요"
          type="nickname"
        ></input>
        {formState.errors.nickname && (
          <span>{formState.errors.nickname.message}</span>
        )}
      </div>
      <div>
        <input
          {...register("password", { required: true })}
          placeholder="비밀번호를 입력하세요"
          type="password"
        ></input>
        {formState.errors.password && (
          <span>{formState.errors.password.message}</span>
        )}
      </div>
    </form>
  );
};

export default SignUpPage;
