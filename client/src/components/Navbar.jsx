import { BookOpen, Edit, GraduationCap, Grid, Lightbulb, LogOut, Menu, User, } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <GraduationCap size={"30"} />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">NEXT LEVEL NEXUS</h1>
          </Link>

        </div>

        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>My Account</span>
                  <User size={20} className="ml-2" />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex justify-between items-center transition-transform transform hover:scale-105 hover:bg-gray-400 hover:cursor-pointer">
                    <Link to="/my-learning" className="flex items-center gap-2">
                      My Learning
                    </Link>
                    <BookOpen size={20} className="ml-2" />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between items-center transition-transform transform hover:scale-105 hover:bg-gray-400 hover:cursor-pointer">
                    <Link to="/profile" className="flex items-center gap-2">
                      Edit Profile
                    </Link>
                    <Edit size={20} className="ml-2" />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler} className="flex justify-between items-center transition-transform transform hover:scale-105 hover:bg-gray-400 hover:cursor-pointer">
                    <span>Log out</span>
                    <LogOut size={20} className="ml-2" />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between items-center transition-transform transform hover:scale-105 hover:bg-gray-400 hover:cursor-pointer">
                    <Link to="/skillspring" className="flex items-center gap-2">
                      SkillSpring
                    </Link>
                    <Lightbulb size={20} className="ml-2" />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex justify-between items-center transition-transform transform hover:scale-105 hover:bg-gray-400 hover:cursor-pointer">
                      <Link to="/admin/dashboard" className="flex items-center gap-2">
                        Dashboard
                      </Link>
                      <Grid size={20} className="ml-2" />
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>


            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          {user ? (
            <>
              <Link to="/my-learning">My Learning</Link>
              <Link to="/profile">Edit Profile</Link>
              <button onClick={logoutHandler}>Log out</button>
              {user?.role === "instructor" && (
                <Button type="submit" onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
              )}
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
