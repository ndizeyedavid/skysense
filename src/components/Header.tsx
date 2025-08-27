import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-5">
      {/* links */}
      <div className="flex items-center gap-3">
        <NavLink to="/">
          <Button variant="outline">Today</Button>
        </NavLink>
        <NavLink to="/forecast">
          <Button variant="outline">Forecast</Button>
        </NavLink>
        <NavLink to="/map">
          <Button variant="outline">Map</Button>
        </NavLink>
      </div>

      {/* Profile */}
      <div>
        <Avatar className="border">
          <AvatarImage src="" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
