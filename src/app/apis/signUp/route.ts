"use client";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest } from "next/server";

interface SignUp {
  email: string;
  password: string;
  nickname: string;
}

const supabase = createClient();

export const POST = async (request: NextRequest) => {
  try {
    const { email, password, nickname }: SignUp = await request.json();

    await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nickname: nickname,
        },
      },
    });

    return new Response(JSON.stringify({ message: "회원가입 성공" }), {
      status: 200,
    });
  } catch (error) {
    console.error("회원가입 에러:", error);
    return new Response(JSON.stringify({ error: "회원가입 실패" }), {
      status: 500,
    });
  }
};
