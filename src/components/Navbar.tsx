import { getAuthSession } from "@/lib/auth";
import { HandMetal } from "lucide-react";
import Link from "next/link";
import UserAccountNav from "./UserAccountNav";
import { buttonVariants } from "./ui/button";

export const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="bg-slate-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <HandMetal />
        </Link>

        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants()}
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};
