import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type ActionItem<T> = {
  label: string;
  onClick: (data: T) => void;
};

type ActionsDropdownProps<T> = {
  actions: ActionItem<T>[] | [];
  data: T; 
};

const ActionsDropdown = <T,>({ actions, data }: ActionsDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {actions.map((action, index) => (
          <DropdownMenuItem key={index} onClick={() => action.onClick(data)}>
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
