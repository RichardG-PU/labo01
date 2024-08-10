"use client";

import { Note } from "@/db/schemas/notes";
import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Edit } from "lucide-react";
import EditNoteDialog from "./EditNoteDialog";

type Props = {
  note: Note;
};

function EditButton({ note }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Edit className="size-5 text-muted-foreground" />
      </DialogTrigger>

      <EditNoteDialog setOpen={setOpen} note={note} />
    </Dialog>
  );
}

export default EditButton;
