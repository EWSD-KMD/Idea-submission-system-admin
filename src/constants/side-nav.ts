import { FileSpreadsheet, House, Settings } from "lucide-react";

export const sideNav = {
  home: [
    {
      name: "Admin",
      url: "/users",
      icon: FileSpreadsheet,
    },
    {
      name: "Role",
      url: "/roles",
      icon: FileSpreadsheet,
    },
    {
      name: "Menu",
      url: "/menus",
      icon: FileSpreadsheet,
    },
    {
      name: "Permission",
      url: "/permissions",
      icon: FileSpreadsheet,
    },
    {
      name: "Deparment",
      url: "/departments",
      icon: House,
    },
    {
      name: "Settings",
      url: "/setting",
      icon: Settings,
    },
  ]
};
