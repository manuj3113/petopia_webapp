"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "./utils/apiClient";
import { API_BASE_URL_DEMO, LOGIN_API } from "@/app/constants/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login is initiated

    try {
      const response = await apiRequest(`${API_BASE_URL_DEMO}${LOGIN_API}`, {
        method: "POST",
        body: JSON.stringify({
          user: userName,
          password: password,
          type: "email",
        }),
      });

      if (!response || !response.token) {
        toast.error('Invalid credentials', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      } else {
       // Save JWT token

        // Wait for a short time to allow toast to show before routing
        setTimeout(() => {
          router.push("/private/dashboard");
        }, 500);
        
        toast.success('Login successful', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        localStorage.setItem("token", response.token); // Delay routing slightly to allow toast to be displayed
      }
    } catch (error: any) {
      setError(error.message || "Login failed");
      toast.error('Login failed', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return (
    <div className="min-h-screen loginpageadd flex flex-col items-center justify-center p-8">
      <main className="login-container loginpageadd">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Welcome back </h2>
          <p className="login-title">Login your account</p>
          {/* {error && <p className="login-error">{error}</p>} */}
          <div className="form-group">
            <input
              id="username"
              type="text"
              placeholder="Email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="remindbox">
            <div className="left-remind">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="forgetadd">
              <a href="#">Forgot Password</a>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
      <div className="login-footer">
        <p>Copyright ©2025</p>
      </div>
      <ToastContainer />
    </div>
  );
}
