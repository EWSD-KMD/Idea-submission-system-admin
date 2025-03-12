import { FileSpreadsheet, House, Settings } from "lucide-react";

export const sideNav = {
  home: [
    {
      name: "Admin",
      url: "/",
      icon: FileSpreadsheet,
    },
    {
      name: "Deparment",
      url: "/dashboard",
      icon: House,
    },
    {
      name: "Settings",
      url: "/setting",
      icon: Settings,
    },
  ]
};
