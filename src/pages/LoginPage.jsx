import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleLogin } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const result = await dispatch(googleLogin(tokenResponse.access_token));
            if (!result.error) {
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error(result.payload || 'Google Login failed');
            }
        },
        onError: () => {
            toast.error('Google Sign In was unsuccessful. Try again later');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error('Please enter a valid email');
            return;
        }

        const result = await dispatch(login(formData));
        if (!result.error) {
            toast.success('Login successful!');
            navigate('/');
        } else {
            toast.error(result.payload || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-light py-12">
            <div className="card p-8 w-full max-w-md">
                <h1 className="text-display text-center mb-8">Welcome Back</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input-field"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="input-field pr-10"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm">Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm uppercase tracking-wider">
                            <span className="px-4 bg-background text-text-muted font-bold text-[10px]">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={() => loginWithGoogle()}
                            className="w-full flex items-center justify-center gap-3 bg-white/5 dark:bg-white/5 border border-border hover:bg-white/10 dark:hover:bg-white/10 text-text font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-sm active:scale-[0.98]"
                        >
                            <FcGoogle size={24} />
                            <span className="tracking-tight">Sign in with Google</span>
                        </button>
                    </div>
                </form>
                <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
