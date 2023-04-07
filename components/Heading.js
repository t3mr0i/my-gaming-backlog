import React, { useState } from "react";
import { useRouter } from "next/router";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm.js";
import Modal from "./Modal";

const Heading = ({ user, handleLogout }) => {
  const router = useRouter();
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
          {/* Add your logo here */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded"></div>
            <h1 className="text-2xl font-semibold font-sans">
              My Gaming Backlog
            </h1>
          </div>
          <nav className="nav">
            {user ? (
              <div className="flex items-center space-x-4">
                <span>{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-sans"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleRegisterButtonClick}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-sans"
                >
                  Register
                </button>
                <button
                  onClick={handleLoginButtonClick}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-sans"
                >
                  Login
                </button>
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
