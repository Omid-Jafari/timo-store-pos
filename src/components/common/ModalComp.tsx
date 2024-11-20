import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const ModalComp = ({
  trigger,
  title,
  children,
  open,
  setOpen,
  dialogContentClassName,
}: {
  trigger?: ReactNode | undefined;
  title: string;
  children: ReactNode;
  open: boolean;
  dialogContentClassName?: string;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className={`max-w-5xl ${dialogContentClassName}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalComp;
