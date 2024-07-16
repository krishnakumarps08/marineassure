"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function login(data: { email: string; password: string }) {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { error, data: userData } = await supabase.auth.signInWithPassword({
    email: data?.email,
    password: data?.password,
  });

  if (error) {
    return { error: error?.message };
  }

  if (userData) {
    redirect("/user");
  } else {
    return { error: "Your account is inactive. Please contact support." };
  }
}
