import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Moon, Settings2 } from "lucide-react";

export default function Header() {
  const location = useLocation();

  const { theme, setTheme } = useTheme();
  const changeTheme = React.useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <div className="flex items-center justify-between mb-3 sm:mb-5">
      {/* links */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <NavLink to="/">
          <Button
            variant="outline"
            className={cn(
              "text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10 nav-button",
              location.pathname === "/" && "nav-button-active",
            )}
          >
            Today
          </Button>
        </NavLink>
        <NavLink to="/measurements">
          <Button
            variant="outline"
            className={cn(
              "text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10 nav-button",
              location.pathname === "/measurements" && "nav-button-active",
            )}
          >
            Measurements
          </Button>
        </NavLink>
        {/* <NavLink to="/forecast">
          <Button
            variant="outline"
            className={cn(
              "text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10 nav-button",
              location.pathname === "/forecast" && "nav-button-active",
            )}
          >
            Forecast
          </Button>
        </NavLink>
        <NavLink to="/history">
          <Button
            variant="outline"
            className={cn(
              "text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10 nav-button",
              location.pathname === "/history" && "nav-button-active",
            )}
          >
            History
          </Button>
        </NavLink>
        <NavLink to="/map">
          <Button
            variant="outline"
            className={cn(
              "text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10 nav-button",
              location.pathname === "/map" && "nav-button-active",
            )}
          >
            Map
          </Button>
        </NavLink> */}
      </div>

      {/* Profile */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="border h-8 w-8 sm:h-10 sm:w-10 cursor-pointer hover:opacity-80">
              <AvatarImage src="" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={changeTheme}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Change Theme</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
