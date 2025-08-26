import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-5">
      {/* links */}
      <div className="flex items-center gap-3">
        <Button variant="outline">Today</Button>
        <Button variant="outline">Forecast</Button>
        <Button variant="outline">History</Button>
      </div>

      {/* Profile */}
      <div>
        <Avatar className="border">
          <AvatarImage src="/vite.svg" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
