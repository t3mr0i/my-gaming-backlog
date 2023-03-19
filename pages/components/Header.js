import React, { useEffect, useState } from "react";
import { auth, handleSubmit } from "./firebase";
import Modal from "./Modal";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm.js"; // import LoginForm component

const Header = () => {
  const [user, setUser] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // Add state for login form

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

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
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
              <>
                <button
                  onClick={handleRegisterButtonClick}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-sans mr-2"
                >
                  Register
                </button>
                <button onClick={handleLoginButtonClick}>Login</button>
              </>
            )}
          </div>
        </div>
      </header>
      {showRegisterForm && (
        <Modal onClose={handleCloseRegisterForm}>
          <RegisterForm onClose={handleCloseRegisterForm} />
        </Modal>
      )}
      {showLoginForm && (
        <Modal onClose={handleCloseLoginForm}>
          <LoginForm onClose={handleCloseLoginForm} />
        </Modal>
      )}
    </>
  );
};

export default Header;
