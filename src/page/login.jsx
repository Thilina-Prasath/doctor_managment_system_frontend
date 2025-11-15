import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Stethoscope, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('auth-token', token);
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                navigate('/home');
            } else {
                setError('Login failed: No token received.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden 
                        bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 
                        dark:from-blue-900 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-700">

            {/* Floating Gradient Circles */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/3 -left-1/3 w-[70vw] h-[70vw] 
                               bg-gradient-to-br from-cyan-400/30 to-blue-600/30 
                               dark:from-cyan-600/20 dark:to-blue-800/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/3 -right-1/3 w-[70vw] h-[70vw] 
                               bg-gradient-to-tl from-pink-400/30 to-purple-600/30 
                               dark:from-pink-700/20 dark:to-purple-900/40 rounded-full blur-3xl"
                />
            </div>

            {/* Transparent Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/40 dark:bg-white/10 backdrop-blur-2xl 
                                rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.37)] 
                                border border-white/30 dark:border-white/10 overflow-hidden 
                                transition-all duration-700">

                    {/* Header Section */}
                    <div className="p-3 text-center border-b border-white/20 dark:border-white/10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 
                                       bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-2xl mb-2 shadow-lg"
                        >
                            <Stethoscope className="text-indigo-700 dark:text-indigo-200" size={40} />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center "
                        >
                            Welcome Back
                            <Sparkles className="text-yellow-400 dark:text-yellow-300" size={22} />
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Sign in to continue to your dashboard
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-red-500/20 border border-red-500/30 
                                                   text-red-700 dark:text-red-100 p-3 rounded-xl text-sm"
                                    >
                                        <p className="font-medium">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 
                                                 text-gray-500 dark:text-gray-300" size={18} />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 
                                               bg-white/50 dark:bg-white/10 text-gray-800 dark:text-white 
                                               placeholder-gray-500 dark:placeholder-gray-400 
                                               border border-gray-300/50 dark:border-white/20 
                                               rounded-xl focus:border-indigo-400 
                                               focus:ring-2 focus:ring-indigo-400/40 outline-none backdrop-blur-md"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 
                                                 text-gray-500 dark:text-gray-300" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-12 py-3 
                                               bg-white/50 dark:bg-white/10 text-gray-800 dark:text-white 
                                               placeholder-gray-500 dark:placeholder-gray-400 
                                               border border-gray-300/50 dark:border-white/20 
                                               rounded-xl focus:border-indigo-400 
                                               focus:ring-2 focus:ring-indigo-400/40 outline-none backdrop-blur-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 
                                               text-gray-500 dark:text-gray-300 hover:text-indigo-500 transition"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Sign In Button */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 rounded-xl 
                                           bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                                           text-white font-semibold shadow-lg 
                                           hover:shadow-indigo-400/50 transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </motion.button>

                            {/* Sign Up Link */}
                            <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
                                Don't have an account?{' '}
                                <a href="/register" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-400 font-medium transition ">
                                    Sign up
                                </a>
                            </p>
                        </form>

                        {/* Beautiful Footer */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 pt-6 border-t border-white/30 dark:border-white/10"
                        >
                            <p className="text-center text-gray-600 dark:text-gray-300 text-xs flex items-center justify-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Secure login • End-to-end encrypted
                            </p>
                            
                            <div className="text-center space-y-1">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    © 2025 All rights reserved
                                </p>
                                <a 
                                    href="https://www.linkedin.com/in/prasath-thilina-747663355" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 transition-colors group"
                                >
                                    <span className="text-xs"> Developed by</span>
                                    <span className="font-bold text-1xl bg-white bg-clip-text text-transparent ">
                                        Prasath Thilina
                                    </span>
                                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;