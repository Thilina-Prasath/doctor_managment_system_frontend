import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserPlus, Search, Stethoscope, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [doctors, setDoctors] = useState([]);
    const [doctorName, setDoctorName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [consultant, setConsultant] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Logs the user out by clearing their data from localStorage
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    // Fetches doctors specifically for the currently logged-in user
    const fetchDoctors = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            handleLogout(); // If no token, the user is not logged in
            return;
        }
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // The server correctly returns an empty array [] for new users
            setDoctors(res.data);
        } catch (err) {
            setError('Failed to fetch doctors.');
            // If the token is bad/expired, log the user out
            if (err.response?.status === 401) handleLogout();
        }
    };
    
    // Runs once when the component loads to fetch the initial list of doctors
    useEffect(() => {
        fetchDoctors();
    }, []);

    // Handles the submission of the "Add Doctor" form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!doctorName || !mobileNumber || !workplace || !consultant) {
            setError('Please fill in all fields.');
            return;
        }
        try {
            const token = localStorage.getItem('auth-token');
            const doctorData = { 
                doctor_name: doctorName, 
                doctor_mobile_number: mobileNumber, 
                workplace, 
                consultant 
            };
            await axios.post(`${import.meta.env.VITE_API_URL}/api/doctors`, doctorData, {
            headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
            });
            setMessage('✅ Doctor added successfully!');
            // Clear the form
            setDoctorName('');
            setMobileNumber('');
            setWorkplace('');
            setConsultant('');
            // Refresh the list to show the new doctor
            fetchDoctors();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add doctor.');
        }
    };

    const filteredDoctors = doctors.filter((doctor) =>
        (doctor.doctor_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 p-4 sm:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-4xl font-extrabold text-gray-800 flex items-center gap-2"
                >
                    <Stethoscope className="text-indigo-600" size={36} /> 
                    Doctor Management
                </motion.h1>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button 
                        onClick={() => navigate('/emergency-doctors')} 
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition shadow-md"
                    >
                        Emergency Doctors
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl shadow transition"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            <main>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl mb-12"
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                        <UserPlus className="text-indigo-600" /> 
                        Add a New Doctor
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
                                {error}
                            </p>
                        )}
                        {message && (
                            <p className="text-green-600 bg-green-100 p-3 rounded-lg mb-4">
                                {message}
                            </p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input 
                                type="text" 
                                placeholder="Doctor Name" 
                                value={doctorName} 
                                onChange={(e) => setDoctorName(e.target.value)} 
                                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                            <input 
                                type="text" 
                                placeholder="Mobile Number" 
                                value={mobileNumber} 
                                onChange={(e) => setMobileNumber(e.target.value)} 
                                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                            <input 
                                type="text" 
                                placeholder="Workplace" 
                                value={workplace} 
                                onChange={(e) => setWorkplace(e.target.value)} 
                                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                            <input 
                                type="text" 
                                placeholder="Consultant/Specialty" 
                                value={consultant} 
                                onChange={(e) => setConsultant(e.target.value)} 
                                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition shadow-md"
                        >
                            Add Doctor
                        </button>
                    </form>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2 }} 
                    className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor List</h2>
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <motion.div 
                                    key={doctor._id} 
                                    whileHover={{ scale: 1.03 }} 
                                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        {doctor.doctor_name}
                                    </h3>
                                    <div className="space-y-2 text-left text-gray-700">
                                        <p>
                                            <strong className="text-indigo-600">Consultant:</strong>{' '}
                                            {doctor.consultant}
                                        </p>
                                        <p>
                                            <strong className="text-indigo-600">Workplace:</strong>{' '}
                                            {doctor.workplace}
                                        </p>
                                        <p>
                                            <strong className="text-indigo-600">Mobile:</strong>{' '}
                                            {doctor.doctor_mobile_number}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 py-8">
                                No doctors have been added yet.
                            </p>
                        )}
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Home;