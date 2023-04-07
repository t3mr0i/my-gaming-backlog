import React from "react";
import { auth } from "./firebase";
import Heading from "./Heading";

const Layout = ({ children, user }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <Heading user={user} handleLogout={handleLogout} />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
