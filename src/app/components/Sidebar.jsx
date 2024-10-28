"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

const menuItems = [
  { text: "Home", icon: <DashboardIcon />, link: "/" },
  { text: "Inventory", icon: <InventoryIcon />, link: "/inventory" },
  { text: "Orders", icon: <ShoppingCartIcon />, link: "/orders" },
  { text: "Material", icon: <SettingsIcon />, link: "/materials" },
  { text: "Attendance", icon: <EventNoteIcon />, link: "/attendance" },
  { text: "Employee", icon: <PersonIcon />, link: "/employee" },
  { text: "Labour", icon: <PersonIcon />, link: "/labour" },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <IconButton onClick={toggleDrawer} className="mb-4 text-white md:hidden">
        <CloseIcon />
      </IconButton>
      <List>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.link;
          return (
            <Link href={item.link} key={index} passHref>
              <ListItem
                button
                onClick={toggleDrawer}
                className={`text-white hover:bg-gray-700 rounded-md ${
                  isActive ? "shadow-lg bg-gray-700" : ""
                }`}
              >
                <ListItemIcon
                  className={`text-white ${isActive ? "shadow-lg" : ""}`}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        className="text-black bg-white  fixed top-7 left-4 z-50 md:hidden"
      >
        <MenuIcon />
      </IconButton>

      <aside className="hidden md:flex">
        <div className="w-64 text-white  h-screen">{drawerContent}</div>
      </aside>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        className="md:hidden"
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}
