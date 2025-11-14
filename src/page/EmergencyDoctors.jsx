import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Download, Edit, Trash2, X, Phone, Briefcase, Stethoscope, ArrowLeft, AlertCircle } from 'lucide-react';

const EmergencyDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({ doctor_name: '', doctor_mobile_number: '', workplace: '', consultant: '' });
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isPdfReady, setIsPdfReady] = useState(false);
    const navigate = useNavigate();

    // Get token from localStorage - check both locations
    const getToken = () => {
        // First try to get from auth-token
        let token = localStorage.getItem('auth-token');
        
        // If not found, try to get from userInfo
        if (!token) {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                try {
                    const parsed = JSON.parse(userInfo);
                    token = parsed.token;
                } catch (e) {
                    console.error('Error parsing userInfo:', e);
                }
            }
        }
        
        return token;
    };

    // Dynamically load PDF generation scripts from a CDN
    useEffect(() => {
        const jspdfScript = document.createElement('script');
        jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        jspdfScript.async = true;
        jspdfScript.onload = () => {
            window.jsPDF = window.jspdf.jsPDF;
            const autotableScript = document.createElement('script');
            autotableScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js';
            autotableScript.async = true;
            autotableScript.onload = () => setIsPdfReady(true);
            document.head.appendChild(autotableScript);
        };
        document.head.appendChild(jspdfScript);
    }, []);

    // Fetch emergency doctors for the specific user who is logged in
    const fetchDoctors = async () => {
        const token = getToken();
        
        if (!token) {
            console.error('No token found');
            navigate('/login');
            return;
        }

        try {
            const config = { 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/emergencydoctors`,config);

            setDoctors(data);
        } catch (error) {
            console.error("Failed to fetch doctors:", error);
            setError('Failed to load doctors. Please try again.');
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/login');
            }
        }
    };
    
    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        const token = getToken();
        
        if (!token) {
            setError('No authentication token found. Please login again.');
            navigate('/login');
            return;
        }

        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            } 
        };

        try {
            const apiEndpoint = 'http://localhost:5000/api/emergencydoctors';
            if (editingDoctor) {
                await axios.put(`${apiEndpoint}/${editingDoctor._id}`, form, config);
                setSuccess('Doctor updated successfully!');
            } else {
                await axios.post(apiEndpoint, form, config);
                setSuccess('Doctor added successfully!');
            }
            resetForm();
            fetchDoctors();
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            console.error("Failed to save doctor:", error);
            setError(error.response?.data?.message || 'Failed to save doctor.');
        }
    };
    
    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setForm({
            doctor_name: doctor.doctor_name,
            doctor_mobile_number: doctor.doctor_mobile_number,
            workplace: doctor.workplace || '',
            consultant: doctor.consultant || ''
        });
        setShowModal(true);
    };
    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            const token = getToken();
            
            if (!token) {
                setError('No authentication token found. Please login again.');
                navigate('/login');
                return;
            }

            try {
                const config = { 
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    } 
                };
                await axios.delete(`http://localhost:5000/api/emergencydoctors/${id}`, config);
                setSuccess('Doctor deleted successfully!');
                fetchDoctors();
                setTimeout(() => setSuccess(''), 3000);
            } catch (error) {
                console.error("Failed to delete doctor:", error);
                setError('Failed to delete doctor. Please try again.');
            }
        }
    };

    const resetForm = () => {
        setEditingDoctor(null);
        setForm({ doctor_name: '', doctor_mobile_number: '', workplace: '', consultant: '' });
        setShowModal(false);
        setError('');
    };
    
    // Generates a PDF of the emergency doctors for the current user
    const downloadPdf = () => {
        if (!isPdfReady) return;
        const doc = new window.jsPDF();
        doc.setFontSize(20);
        doc.setTextColor(79, 70, 229);
        doc.text("Emergency Doctor Directory", 20, 20);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 28);
        
        doc.autoTable({
            startY: 35,
            head: [['Name', 'Mobile', 'Workplace', 'Consultant']],
            body: doctors.map(d => [d.doctor_name, d.doctor_mobile_number, d.workplace || 'N/A', d.consultant || 'N/A']),
            theme: 'striped',
            headStyles: { 
                fillColor: [224, 36, 36],
                fontSize: 11,
                fontStyle: 'bold'
            },
            styles: { fontSize: 10 }
        });
        
        doc.save('emergency-doctors.pdf');
        setSuccess('PDF downloaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
         <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-100 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3 mb-2">
                            <div className="bg-red-500 p-3 rounded-xl shadow-lg">
                                <AlertCircle className="text-white" size={32} />
                            </div>
                            Emergency Doctors
                        </h1>
                        <p className="text-gray-600 ml-16 sm:ml-14">Quick access to critical medical contacts</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/')} className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl shadow-lg transition">
                            <ArrowLeft size={18} /> Back
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-5 py-3 rounded-xl shadow-lg transition">
                            <Plus size={18} /> Add Doctor
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={downloadPdf} disabled={!isPdfReady || doctors.length === 0} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-3 rounded-xl shadow-lg transition disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500">
                            <Download size={18} /> {isPdfReady ? 'PDF' : 'Loading...'}
                        </motion.button>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {success && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 shadow-md">
                            <p className="font-medium">{success}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-md">
                            <p className="font-medium">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.length === 0 ? (
                        <div className="col-span-full bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-12 text-center">
                            <AlertCircle className="mx-auto text-gray-400 mb-4" size={64} />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Emergency Doctors Added</h3>
                            <p className="text-gray-500 mb-6">Start by adding your first emergency contact for this user.</p>
                            <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-700 transition shadow-lg">
                                Add First Doctor
                            </button>
                        </div>
                    ) : (
                        doctors.map((doctor, index) => (
                            <motion.div key={doctor._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all border border-red-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-xl shadow-lg">
                                        <Stethoscope className="text-white" size={24} />
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(doctor)} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition">
                                            <Edit size={18} />
                                        </motion.button>
                                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(doctor._id)} className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition">
                                            <Trash2 size={18} />
                                        </motion.button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{doctor.doctor_name}</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Phone size={16} className="text-red-500" />
                                        <span className="font-medium">{doctor.doctor_mobile_number}</span>
                                    </div>
                                    {doctor.workplace && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Briefcase size={16} className="text-purple-500" />
                                            <span>{doctor.workplace}</span>
                                        </div>
                                    )}
                                    {doctor.consultant && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Stethoscope size={16} className="text-pink-500" />
                                            <span>{doctor.consultant}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>

                <AnimatePresence>
                    {showModal && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={resetForm} />
                            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-0 flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                                    <div className="sticky top-0 bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
                                        <h3 className="text-2xl font-bold">{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
                                        <button onClick={resetForm} className="hover:bg-white/20 p-2 rounded-lg transition"><X size={24} /></button>
                                    </div>
                                    <form onSubmit={handleSubmit} className="p-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor Name *</label>
                                                <input type="text" name="doctor_name" value={form.doctor_name} onChange={handleInputChange} placeholder="Dr. John Smith" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                                                <input type="text" name="doctor_mobile_number" value={form.doctor_mobile_number} onChange={handleInputChange} placeholder="+1 234 567 8900" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Workplace</label>
                                                <input type="text" name="workplace" value={form.workplace} onChange={handleInputChange} placeholder="City General Hospital" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Consultant/Specialty</label>
                                                <input type="text" name="consultant" value={form.consultant} onChange={handleInputChange} placeholder="Cardiology" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition" />
                                            </div>
                                        </div>
                                        <div className="flex gap-3 mt-6">
                                            <button type="button" onClick={resetForm} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition">Cancel</button>
                                            <button type="submit" className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition shadow-lg">{editingDoctor ? 'Update' : 'Add'} Doctor</button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EmergencyDoctor;