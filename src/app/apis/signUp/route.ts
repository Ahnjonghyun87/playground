import { createClient } from "@/app/utils/supabase/server";

interface SignUp {
  email: string;
  password: string;
  nickname: string;
}

const supabase = createClient();

export const POST = async ({ email, password, nickname }: SignUp) => {
  try {
    await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nickname: nickname,
        },
      },
    });
  } catch (error) {
    console.error("회원가입 에러:", error);
    return { error: error };
  }
};
