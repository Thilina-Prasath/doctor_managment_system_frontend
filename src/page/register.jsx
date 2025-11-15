import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const getPasswordStrength = () => {
        const length = password.length;
        if (length === 0) return { width: '0%', color: 'bg-transparent', text: '' };
        if (length < 6) return { width: '25%', color: 'bg-red-500', text: 'Weak' };
        if (length < 8) return { width: '50%', color: 'bg-yellow-500', text: 'Fair' };
        if (length < 12) return { width: '75%', color: 'bg-blue-500', text: 'Good' };
        return { width: '100%', color: 'bg-green-500', text: 'Strong' };
    };
    const passwordStrength = getPasswordStrength();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // Use the API_URL variable
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, { username, email, password });
            const token = data.token;
            if (token) {
                localStorage.setItem('auth-token', token);
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/login'); // Navigate to login after successful registration
            } else {
                setError('Registration failed: No token received.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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

            {/* Transparent Register Card */}
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
                    <div className="p-6 text-center border-b border-white/20 dark:border-white/10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 
                                       bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-2xl mb-2 shadow-lg"
                        >
                            <UserPlus className="text-indigo-700 dark:text-indigo-200" size={40} />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-gray-900 dark:text-white mb-1 flex items-center justify-center gap-2"
                        >
                            Create an Account
                            <Sparkles className="text-yellow-400 dark:text-yellow-300" size={22} />
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Join us and start your journey today
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
                            
                            {/* Username */}
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 
                                           text-gray-500 dark:text-gray-300" size={18} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 
                                               bg-white/50 dark:bg-white/10 text-gray-800 dark:text-white 
                                               placeholder-gray-500 dark:placeholder-gray-400 
                                               border border-gray-300/50 dark:border-white/20 
                                               rounded-xl focus:border-indigo-400 
                                               focus:ring-2 focus:ring-indigo-400/40 outline-none backdrop-blur-md"
                                />
                            </div>

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
                            <div>
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
                                                   focus:ring-2 focus:ring-indigo-400/4D outline-none backdrop-blur-md"
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
                                {password.length > 0 && (
                                    <div className="mt-2">
                                        <div className="h-1.5 w-full bg-gray-300/50 dark:bg-white/20 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full ${passwordStrength.color}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: passwordStrength.width }}
                                                transition={{ ease: "easeOut", duration: 0.5 }}
                                            />
                                        </div>
                                        <p className="text-right text-xs mt-1 text-gray-600 dark:text-gray-300 font-medium">
                                            {passwordStrength.text}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Sign Up Button */}
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
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Sign Up
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </motion.button>

                            {/* Sign In Link */}
                            <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
                                Already have an account?{' '}
                                <button type="button" onClick={() => navigate('/login')} className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-400 font-medium transition bg-transparent border-none cursor-pointer p-0">
                                    Sign in
                                </button>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-6">
                    © 2025 — Your data is secure and encrypted
                </p>
            </motion.div>
        </div>
    );
};

// Export only the Register component as the default
export default Register;