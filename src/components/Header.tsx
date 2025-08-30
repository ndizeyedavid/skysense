import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-3 sm:mb-5">
      {/* links */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <NavLink to="/">
          <Button
            variant="outline"
            className="text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10"
          >
            Today
          </Button>
        </NavLink>
        <NavLink to="/forecast">
          <Button
            variant="outline"
            className="text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10"
          >
            Forecast
          </Button>
        </NavLink>
        <NavLink to="/history">
          <Button
            variant="outline"
            className="text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10"
          >
            History
          </Button>
        </NavLink>
        <NavLink to="/map">
          <Button
            variant="outline"
            className="text-xs sm:text-sm px-2.5 sm:px-4 h-8 sm:h-10"
          >
            Map
          </Button>
        </NavLink>
      </div>

      {/* Profile */}
      <div>
        <Avatar className="border h-8 w-8 sm:h-10 sm:w-10">
          <AvatarImage src="" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
