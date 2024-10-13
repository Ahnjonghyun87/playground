import { Users } from "@/app/types/users";
import { createClient } from "./../../utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password, nickname } = (await request.json()) as Users;

  // eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });
  if (error) {
    console.log("error message:", error.message);
  }
  // public.users 테이블에 유저 정보 추가는 트리거를 통해 처리
  // await supabase.from("users").insert({email, pw, nickname})

  return Response.json({ errorMsg: error?.message || null });
}
