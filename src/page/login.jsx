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
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('auth-token', token);
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                navigate('/');
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
                    <div className="p-6 text-center border-b border-white/20 dark:border-white/10">
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
                            className="text-3xl font-bold text-gray-900 dark:text-white mb-1 flex items-center justify-center gap-2"
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

                            {/* Remember Me */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="accent-indigo-500 w-4 h-4" />
                                    <span className="text-gray-700 dark:text-gray-300">Remember me</span>
                                </label>
                                <a href="#" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-400 transition">
                                    Forgot password?
                                </a>
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
                                Don’t have an account?{' '}
                                <a href="/register" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-400 font-medium transition">
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-6">
                    © 2025 — Secure login powered by encryption
                </p>
            </motion.div>
        </div>
    );
};

export default Login;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, Lock, Stethoscope, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');
//         try {
//             const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
//             const token = response.data.token;
//             if (token) {
//                 // Store BOTH auth-token and userInfo for consistency
//                 localStorage.setItem('auth-token', token);
//                 localStorage.setItem('userInfo', JSON.stringify(response.data));
//                 navigate('/');
//             } else {
//                 setError('Login failed: No token received.');
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
//             {/* Animated Background Elements */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <motion.div
//                     animate={{
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 90, 0],
//                     }}
//                     transition={{
//                         duration: 20,
//                         repeat: Infinity,
//                         ease: "linear"
//                     }}
//                     className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"
//                 />
//                 <motion.div
//                     animate={{
//                         scale: [1.2, 1, 1.2],
//                         rotate: [90, 0, 90],
//                     }}
//                     transition={{
//                         duration: 15,
//                         repeat: Infinity,
//                         ease: "linear"
//                     }}
//                     className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-3xl"
//                 />
//             </div>

//             {/* Login Card */}
//             <motion.div 
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-full max-w-md relative z-10"
//             >
//                 <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
//                     {/* Header Section */}
//                     <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 text-center">
//                         <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//                             className="inline-flex items-center justify-center w-18 h-18 bg-white/20 backdrop-blur-sm rounded-2xl mb-1 shadow-lg"
//                         >
//                             <Stethoscope className="text-white" size={40} />
//                         </motion.div>
                        
//                         <motion.h2 
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.3 }}
//                             className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2 p-4"
//                         >
//                             Welcome Back
//                             <Sparkles className="text-yellow-300" size={24} />
//                         </motion.h2>
                        
//                         <motion.p 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.4 }}
//                             className="text-blue-100"
//                         >
//                         </motion.p>

//                         {/* Decorative waves */}
//                         <div className="absolute bottom-0 left-0 right-0">
//                             <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-white">
//                                 <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
//                                 <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
//                                 <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
//                             </svg>
//                         </div>
//                     </div>

//                     {/* Form Section */}
//                     <div className="p-8">
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Error Message */}
//                             <AnimatePresence>
//                                 {error && (
//                                     <motion.div
//                                         initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                                         exit={{ opacity: 0, y: -10, scale: 0.9 }}
//                                         className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm"
//                                     >
//                                         <p className="font-medium">{error}</p>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>

//                             {/* Email Input */}
//                             <motion.div
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.5 }}
//                             >
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Email Address
//                                 </label>
//                                 <div className="relative group">
//                                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
//                                     <input
//                                         type="email"
//                                         placeholder="you@example.com"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                         className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
//                                     />
//                                 </div>
//                             </motion.div>

//                             {/* Password Input */}
//                             <motion.div
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.6 }}
//                             >
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Password
//                                 </label>
//                                 <div className="relative group">
//                                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         placeholder="••••••••"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                         className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
//                                     >
//                                         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                                     </button>
//                                 </div>
//                             </motion.div>

//                             {/* Remember Me & Forgot Password */}
//                             <motion.div
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ delay: 0.7 }}
//                                 className="flex items-center justify-between text-sm"
//                             >
//                                 <label className="flex items-center gap-2 cursor-pointer group">
//                                     <input
//                                         type="checkbox"
//                                         className="w-4 h-4 rounded border-2 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
//                                     />
//                                     <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
//                                 </label>
//                                 <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
//                                     Forgot password?
//                                 </a>
//                             </motion.div>

//                             {/* Submit Button */}
//                             <motion.button
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.8 }}
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 type="submit"
//                                 disabled={isLoading}
//                                 className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 hover:shadow-xl hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2 group"
//                             >
//                                 {isLoading ? (
//                                     <>
//                                         <motion.div
//                                             animate={{ rotate: 360 }}
//                                             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                                             className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                                         />
//                                         Signing in...
//                                     </>
//                                 ) : (
//                                     <>
//                                         Sign In
//                                         <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
//                                     </>
//                                 )}
//                             </motion.button>

//                             {/* Sign Up Link */}
//                             <motion.div
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ delay: 0.9 }}
//                                 className="text-center text-sm text-gray-600"
//                             >
//                                 Don't have an account?{' '}
//                                 <a href="/register" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
//                                     Sign up now
//                                 </a>
//                             </motion.div>
//                         </form>
//                     </div>
//                 </div>

//                 {/* Footer Note */}
//                 <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1 }}
//                     className="text-center text-white/80 text-sm mt-6"
//                 >
//                     Secure login powered by encryption
//                 </motion.p>
//             </motion.div>
//         </div>
//     );
// };

// export default Login;
