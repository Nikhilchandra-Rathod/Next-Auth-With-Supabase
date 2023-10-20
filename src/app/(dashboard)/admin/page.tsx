import { getAuthSession } from "@/lib/auth";

const page = async () => {
  const session = await getAuthSession();

  if (session?.user) {
    return (
      <h2 className="text-2xl">
        Admin page - welcome back {session.user.username}
      </h2>
    );
  }

  return (
    <h2 className="pt-20 text-2xl">Please login to see this admin page.</h2>
  );
};

export default page;
