import { Users_gecko } from "@/app/types/users_gecko";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();

  const {
    name,
    birthday,
    mother,
    father,
    morph,
    gender,
    eatInsect,
    behavior,
    eating,
    mature,
    weight,
    picture,
    vids,
  } = (await request.json()) as Users_gecko;
  const response = await supabase.from("users_gecko").insert({
    name,
    birth_day: birthday,
    mother,
    father,
    morph,
    gender,
    eatInsect,
    behavior,
    eating,
    mature,
    weight,
    pictures: picture,
    vids,
  });

  if (response.error) {
    console.error(response.error);
    return new Response(JSON.stringify({ error: response.error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ data: response.data }), {
    status: 200,
  });
}
