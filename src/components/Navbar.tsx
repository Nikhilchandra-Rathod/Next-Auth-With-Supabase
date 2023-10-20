import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-slate-100 py-2 border-b border-s-zinc-200 fixed w-full z-10">
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
