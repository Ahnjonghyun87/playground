import { Users } from "@/app/types/users";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password } = (await request.json()) as Omit<Users, "nickname">;
  // eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: password,
  });
  if (error) {
    console.log("error message:", error.message);
  }

  return Response.json({ errorMsg: error?.message });
}
