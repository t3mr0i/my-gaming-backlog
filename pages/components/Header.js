import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm.js";
import Modal from "./Modal";

const Header = ({
  user,
  showLoginForm,
  showRegisterForm,
  handleLogout,
  handleLoginButtonClick,
  handleRegisterButtonClick,
}) => {
  const history = useHistory();

  const handleCloseRegisterForm = () => {
    history.push("/");
  };

  const handleCloseLoginForm = () => {
    history.push("/");
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

export default Header;
