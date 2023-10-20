import React, { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <div className="bg-slate-100 p-8 rounded-md w-full max-w-lg">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
