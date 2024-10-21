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
  const response = await supabase
    .from("users_gecko")
    .insert([
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
    ]);
}
