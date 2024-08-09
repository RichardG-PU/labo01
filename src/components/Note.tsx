"use client";

import { Note as NoteType } from "@/db/schemas/notes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

type Props = {
  note: NoteType;
};

function Note({ note }: Props) {
  return (
    <div className="h-96 w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words rounded-lg bg-neutral-800 p-6">
      <div className="relative mb-2 flex items-center gap-2">
        <h2 className="text-lg font-semibold text-muted-foreground">
          {note.updatedAt.toISOString().slice(0, 10)}
        </h2>

        <EditButton note={note} />

        <DeleteButton noteId={note.id} />
      </div>

      <p>{note.text}</p>
    </div>
  );
}

export default Note;
