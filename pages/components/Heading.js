import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm.js";
import Modal from "./Modal";

const Heading = ({ user, handleLogout }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleRegisterButtonClick = () => {
    setShowRegisterForm(true);
  };

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  return (
    <>
      <header className="header bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold font-sans">
            My Gaming Backlog
          </h1>
          <nav className="nav">
            {user ? (
              <div className="flex items-center">
                <span className="mr-4 text-sm text-gray-200">{user.email}</span>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <button
                  onClick={handleRegisterButtonClick}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300
                  font-sans mr-2"
                >
                  Register
                </button>
                <button onClick={handleLoginButtonClick}>Login</button>
              </div>
            )}
          </nav>
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

export default Heading;
