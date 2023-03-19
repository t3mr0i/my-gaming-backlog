import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // handle login
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full bg-gray-100 p-2 mb-4 rounded border border-gray-200"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block w-full bg-gray-100 p-2 mb-4 rounded border border-gray-200"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
