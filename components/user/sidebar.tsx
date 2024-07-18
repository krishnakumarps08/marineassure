"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LogOut, X } from "lucide-react";
import { logout } from "@/app/user/actions";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import useThemeEffect from "@/lib/usethemeeffect";
import { PiVideo, PiVideoFill } from "react-icons/pi";
import { HiOutlineUserCircle, HiUserCircle } from "react-icons/hi2";
import { MdOutlineVerifiedUser, MdVerifiedUser } from "react-icons/md";
import logo from '../../public/marineassurelogo.png'
export const UserSidebar: React.FC<{ onClose?: () => void }> = ({
  onClose,
}) => {
  const params = usePathname();
  const splittedName = params.split("/");
  const isDark = useThemeEffect();
  console.log(isDark)
  const [accountsHovered, setAccountsHovered] = useState(false);
  const [creatorPagesHovered, setCreatorPagesHovered] = useState(false);
  const [generateVideosHovered, setGenerateVideosHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);

  return (
    <div className="fixed lg:w-[230px] lg:border-r left-0 px-4 py-5 lg:h-[102vh] h-[93vh] flex flex-col justify-between">
      <nav className="grid gap-0 text-sm text-muted-foreground w-full lg:mt-14 mt-1">
        <div className="flex flex-row justify-between mb-3">
          <div className="lg:hidden block  ">
            {isDark ? (
              <Image src={logo} alt="logo" width={100} height={100} className="-mt-5" />
            ) : (
              <Image src={logo} alt="logo" width={100} height={100} className="-mt-5" />
            )}
          </div>
          <div className="lg:hidden block ">
            <X className="h-6 w-6 cursor-pointer" onClick={onClose} />
            <span className="sr-only">Close</span>
          </div>
        </div>
        <Link href="/admin">
          <Button
            variant={"ghost"}
            onClick={onClose}
            className={`py-3 my-1 cursor-pointer text-primary pl-1 items-center gap-x-2 w-full flex justify-start ${
              !splittedName[2] && splittedName[1] === "admin"
                ? "font-bold"
                : "font-normal"
            }`}
            onMouseEnter={() => setAccountsHovered(true)}
            onMouseLeave={() => setAccountsHovered(false)}
          >
            {!splittedName[2] && splittedName[1] === "admin" ? (
              <HiUserCircle
                className={
                  accountsHovered ? "w-[26px] h-[26px]" : "w-[25px] h-[25px] "
                }
              />
            ) : (
              <HiOutlineUserCircle
                className={
                  accountsHovered ? "w-[26px] h-[26px]" : "w-[25px] h-[25px] "
                }
              />
            )}
            Manage accounts
          </Button>
        </Link>
        <Link href="/admin/managecreator">
          <Button
            variant={"ghost"}
            onClick={onClose}
            className={`py-3 my-1 cursor-pointer text-primary pl-1 items-center gap-x-2 w-full flex justify-start ${
              splittedName[2] === "managecreator" ? "font-bold" : "font-normal"
            }`}
            onMouseEnter={() => setCreatorPagesHovered(true)}
            onMouseLeave={() => setCreatorPagesHovered(false)}
          >
            {splittedName[2] === "managecreator" ? (
              <MdVerifiedUser
                className={
                  creatorPagesHovered ? "w-[25px] h-[25px]" : "w-6 h-6 "
                }
              />
            ) : (
              <MdOutlineVerifiedUser
                className={
                  creatorPagesHovered ? "w-[25px] h-[25px]" : "w-6 h-6 "
                }
              />
            )}
            Manage creator pages
          </Button>
        </Link>
        <Link href="/admin/generatevideo">
          <Button
            variant={"ghost"}
            onClick={onClose}
            className={`py-3 my-1 cursor-pointer text-primary pl-1 items-center gap-x-2 w-full flex justify-start ${
              splittedName[2] === "generatevideo" ? "font-bold" : "font-normal"
            }`}
            onMouseEnter={() => setGenerateVideosHovered(true)}
            onMouseLeave={() => setGenerateVideosHovered(false)}
          >
            {splittedName[2] === "generatevideo" ? (
              <PiVideoFill
                className={
                  generateVideosHovered ? "w-[25px] h-[25px]" : "w-6 h-6 "
                }
              />
            ) : (
              <PiVideo
                className={
                  generateVideosHovered ? "w-[25px] h-[25px]" : "w-6 h-6 "
                }
              />
            )}
            Generate content
          </Button>
        </Link>
      </nav>
      <div >
        <form>
          <Button
            variant={"ghost"}
            className={`py-3 my-1 cursor-pointer text-primary pl-1 items-center gap-x-2 w-full flex justify-start ${
              logoutHovered ? "font-bold" : "font-normal"
            }`}
            formAction={logout}
            onMouseEnter={() => setLogoutHovered(true)}
            onMouseLeave={() => setLogoutHovered(false)}
          >
            <LogOut
              absoluteStrokeWidth
              size={logoutHovered ? 25 : 24}
              strokeWidth={logoutHovered ? 2 : 1}
            />
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};
