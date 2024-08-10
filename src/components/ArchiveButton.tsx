"use client";

import { Archive, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  className?: string;
};

export function UserButton({ className }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const redirect = async () => {
    const toastId = toast.loading("Redirecting...");
    if (pathname === "/archive") {
      router.replace("/");
    } else {
      router.replace("/archive");
    }
    toast.dismiss(toastId);
  };

  return (
    <>
      {pathname === "/archive" ? (
        <Home
          className={cn(
            "size-10 text-secondary transition-colors duration-200 ease-in-out hover:text-primary sm:size-12",
            className,
          )}
          onClick={redirect}
        />
      ) : (
        <Archive
          className={cn(
            "size-10 text-secondary transition-colors duration-200 ease-in-out hover:text-primary sm:size-12",
            className,
          )}
          onClick={redirect}
        />
      )}
    </>
  );
}

export default UserButton;
