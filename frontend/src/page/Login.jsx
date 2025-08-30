import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../App";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const { setLoggin } = useContext(AuthContext)
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({});

  const handleForm = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });

    // live validation reset
    setErrorMessage((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrorMessage(errors);
    return Object.keys(errors).length === 0; // valid if no errors
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post(`${BASE_URL}/login`, formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setLoggin(true)
        navigate("/profile");
      }
    } catch (err) {
      if (err.response) {
        console.error("API error:", err.response.data || err.message);

        if (err.response.status === 400 || err.response.status === 404) {
          setErrorMessage({ general: err.response.data.message });
        }
      } else {
        console.error("Unexpected error:", err.message);
      }
    }
  };

  return (
    <div className="container position-relative vh-100">
      <div className="position-absolute top-50 start-50 translate-middle border p-4 rounded shadow-sm w-25">
        <h4 className="text-center mb-4">Login</h4>

        {errorMessage.general && (
          <div className="alert alert-danger">{errorMessage.general}</div>
        )}

        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errorMessage.email ? "is-invalid" : ""
                }`}
              id="email"
              value={formData.email}
              name="email"
              onChange={handleForm}
              autoComplete="off"
            />
            {errorMessage.email && (
              <div className="invalid-feedback">{errorMessage.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errorMessage.password ? "is-invalid" : ""
                }`}
              id="password"
              value={formData.password}
              name="password"
              onChange={handleForm}
              autoComplete="off"
            />
            {errorMessage.password && (
              <div className="invalid-feedback">{errorMessage.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
