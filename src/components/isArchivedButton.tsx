"use client";

import { useState, useTransition } from "react";
import { Archive } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { archiveNoteAction } from "@/actions/notes";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

function ArchiveButton({ noteId }: { noteId: number }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleArchiveNote = async () => {
    startTransition(async () => {
      const { errorMessage } = await archiveNoteAction(noteId);
      if (!errorMessage) {
        setOpen(false);
        toast.success(
          pathname === "/archive"
            ? "Successfully un-archived note"
            : "Successfully archived note",
        );
        router.refresh();
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger className="relative" onClick={() => setOpen(true)}>
        <Archive className="size-5 text-muted-foreground" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          {pathname === "/archive"
            ? "Are you sure you want to un-archive this note?"
            : "Are you sure you want to archive this note?"}
        </AlertDialogHeader>
        <AlertDialogDescription>
          {pathname === "/archive"
            ? "This will un-archive this note."
            : "This will archive this note."}
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>

          <form action={handleArchiveNote}>
            <AlertDialogAction
              type="submit"
              className="bg-destructive hover:bg-destructive hover:brightness-110"
              disabled={isPending}
            >
              {isPending
                ? pathname === "/archive"
                  ? "Un-archiving Note..."
                  : "Archiving Note..."
                : pathname === "/archive"
                  ? "Un-archive Note"
                  : "Archive Note"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ArchiveButton;
