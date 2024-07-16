"use client";

import Image from "next/image";
import { useState } from "react";
import { logout } from "@/app/user/actions";
import { Button } from "@/components/ui/button";
import useThemeEffect from "@/lib/usethemeeffect";
// import logo from "@/../../public/Arouze-icon.png";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { UserSidebar } from "./sidebar";
import { ThemeChanger } from "../../components/icons/themeicon";
// import darkthemelogo from "@/../../public/Arouze-darktheme-icon.png";
// import lightthemelogo from "@/../../public/Arouze-lighttheme-icon.png";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export const UserHeader = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };
  // Determine the background color based on the theme
  const isDarkTheme = useThemeEffect();
  return (
    <header
      className={`fixed w-full top-0 h-16 items-start gap-4 border-b px-4 md:px-6 z-10 ${
        isDarkTheme ? "bg-[#020817]" : "bg-white"
      }`}
    >
      <nav className="flex flex-row justify-between items-center  lg:py-0 py-0">
        <div>
          {isDarkTheme ? (
            <div>
              <Image
                src={"/vercel.svg"}
                alt="logo"
                width={130}
                height={130}
                className="lg:block hidden"
              />
              <Image
                src={"/vercel.svg"}
                alt="logo"
                width={40}
                height={40}
                className="lg:hidden block"
              />
            </div>
          ) : (
            <div>
              {/* <Image
                src={"/vercel.svg"}
                alt="logo"
                width={130}
                height={130}
                className="lg:block hidden"
              />
              <Image
                src={"/vercel.svg"}
                alt="logo"
                width={40}
                height={40}
                className="lg:hidden block"
              /> */}
            </div>
          )}
        </div>
        <div className="py-1 ">
          <div className="py-1  justify-end flex  gap-x-6">
            <div className="py-1 lg:hidden block ">
              <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
                <SheetTrigger asChild>
                  <button
                    onClick={toggleSheet}
                    className="w-11/12"
                    aria-label="Open Sidebar"
                  >
                    <HamburgerMenuIcon className="w-8 h-7 mt-1 ml-2" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-4">
                  <UserSidebar onClose={() => setIsSheetOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
            <div className="">
              <ThemeChanger withText={false} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
