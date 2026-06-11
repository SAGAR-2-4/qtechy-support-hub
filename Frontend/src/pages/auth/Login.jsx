import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, loading, error } =  useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email : "",
        password: "",
    });

    useEffect(() => {
        if (user?.role === "admin") navigate("/admin/dashboard");
        if(user?.role === "agent") navigate("/agent/dashboard");
        if(user?.role === "user") navigate("/user/dashboard");

    },[user, navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
     e.preventDefault();
     dispatch(loginUser(formData));
};


 return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 text-center">
          QTechy Support Hub
        </h1>
        <p className="text-slate-500 text-center mt-2">
          Sign in to manage your support tickets
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@test.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;