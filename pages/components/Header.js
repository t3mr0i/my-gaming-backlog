import React, { useEffect, useState } from "react";
import { auth, handleSubmit } from "./firebase";
import Modal from "./Modal";
import RegisterForm from "./RegisterForm";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleRegisterButtonClick = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <>
      <header className="bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold font-sans">
            My Gaming Backlog
          </h1>
          <div>
            {user ? (
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            ) : (
              <button
                onClick={handleRegisterButtonClick}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-sans"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </header>
      {showRegisterForm && (
        <Modal onClose={handleCloseRegisterForm}>
          <RegisterForm onClose={handleCloseRegisterForm} />
        </Modal>
      )}
    </>
  );
};

export default Header;
