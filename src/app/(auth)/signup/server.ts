"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(data: { email: string; password: string }) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: data?.email,
    password: data?.password,
    options: {
      data: {
        role: "user",
      },
      emailRedirectTo: "http://localhost:3000/signin",
    },
  });

  if (error) {
    return { error: error?.message };
  }
  redirect("/signin");
}
