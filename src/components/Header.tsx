import { getUser } from "@/lib/auth";
import { Lilita_One } from "next/font/google";
import UserButton from "./UserButton";
import NewNoteButton from "./NewNoteButton";
import ArchiveButton from "./ArchiveButton";

const lilita = Lilita_One({ weight: "400", subsets: ["latin"] });

async function Header({ title }: { title: String }) {
  const user = await getUser();

  return (
    <div className="relative mt-2 flex h-20 w-full max-w-5xl items-center justify-between rounded-lg bg-popover px-4">
      <UserButton user={user} />

      <h1 className={`text-4xl text-secondary sm:text-5xl ${lilita.className}`}>
        {title}
      </h1>
      <div className="relative flex items-center justify-between px-6">
        <ArchiveButton className="mr-6" />
        <NewNoteButton />
      </div>
    </div>
  );
}

export default Header;
