"use client";

import { useState, useEffect, useCallback } from "react";
import { Note as NoteType } from "@/db/schemas/notes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./isArchivedButton";
import { archiveNoteAction } from "@/actions/notes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  note: NoteType;
};

function Note({ note }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (isHovered && event.key === "a") {
        event.preventDefault();
        const { errorMessage } = await archiveNoteAction(note.id);
        if (!errorMessage) {
          toast.success(
            note.isArchived
              ? "Successfully un-archived note"
              : "Successfully archived note",
          );
          router.refresh();
        } else {
          toast.error(errorMessage);
        }
      }
    },
    [isHovered, note.id, note.isArchived],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="h-96 w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words rounded-lg bg-neutral-800 p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-2 flex items-center gap-2">
        <h2 className="text-lg font-semibold text-muted-foreground">
          {note.updatedAt.toISOString().slice(0, 10)}
        </h2>

        <EditButton note={note} />

        <ArchiveButton noteId={note.id} />

        <DeleteButton noteId={note.id} />
      </div>

      <p>{note.text}</p>
    </div>
  );
}

export default Note;
