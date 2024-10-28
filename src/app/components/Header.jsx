import { Avatar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <div className="flex items-center space-x-3">
        <Image
          src="https://img.freepik.com/free-vector/oramental-fashion-logo_23-2147521044.jpg?ga=GA1.1.872354475.1668527735&semt=ais_hybrid"
          alt="Company Logo"
          height={40}
          width={40}
          className="ml-5 rounded-full"
        />
        <h1 className="text-lg md:text-xl font-bold truncate">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <Avatar
          alt="User Profile"
          src="/profile.jpg"
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <span className="hidden sm:inline text-sm md:text-base">John Doe</span>
        <IconButton>
          <LogoutIcon />
        </IconButton>
      </div>
    </header>
  );
}
