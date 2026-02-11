import React, { useEffect } from 'react';
import { Mail, Lock, User2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../configs/api';
import { login as loginAction } from '../app/features/authSlice'; // ✅ Renamed import
import toast from 'react-hot-toast';

const Login = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = React.useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  // ✅ Fix 1: 'state' parameter name change
  useEffect(() => {
    const mode = searchParams.get('state'); // ✅ Get 'state' from URL
    if (mode === 'register') {
      setState('register');
    } else {
      setState('login');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Fix 2: Correct API endpoint
      const endpoint = state === 'login' ? '/api/users/login' : '/api/users/register';
      const { data } = await api.post(endpoint, formData);

      // ✅ Fix 3: Use loginAction (renamed import)
      dispatch(loginAction({ token: data.token, user: data.user }));
      localStorage.setItem('token', data.token);
      toast.success(data.message);
      navigate('/app'); // ✅ Redirect to dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form onSubmit={handleSubmit} className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Please {state === "login" ? "login" : "sign up"} to continue
        </p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2 size={16} color="#8616AB" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="flex-1 border-none outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={14} color="#8616AB" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="flex-1 border-none outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={14} color="#8616AB" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="flex-1 border-none outline-none ring-0"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 text-left text-violet-500">
          <button className="text-sm" type="button">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#8616AB' }}
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p className="text-gray-500 text-sm mt-3 mb-11">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
            className="text-violet-500 hover:underline ml-1"
          >
            click here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;