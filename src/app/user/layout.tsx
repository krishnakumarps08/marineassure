import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UserHeader } from "../../../components/user/header";
import { UserSidebar } from "../../../components/user/sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!(user?.user_metadata?.role === "user")) {
    redirect("/login");
  } else {
    return (
      <div className="flex flex-col h-screen ">
        <UserHeader />
        <div className="grid lg:grid-cols-6 w-full">
          <div className="lg:block hidden ">
            <UserSidebar />
          </div>
          <div className="xl:ml-0 lg:ml-10 ml-0 mt-14 md:col-span-5 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
