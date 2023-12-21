import { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import auth from "../lib/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to the home page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </label>
        <br />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="login-link">
        <p>Already have an account? <Link href="/login">Login</Link></p>
      </div>

      <style jsx>{`
        .signup-container {
          max-width: 400px;
          margin: 250px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          box-sizing: border-box;
        }

        .signup-button {
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          margin-bottom: 20px;
          background-color: #2196f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .signup-button:hover {
          background-color: #0b7dda;
        }

        .login-link {
          text-align: center;
          margin-top: 10px;
        }

        .login-link a {
          color: #2196f3;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        .error-message {
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
