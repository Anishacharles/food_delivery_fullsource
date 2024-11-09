

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';

const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    

    const handleLogin = async (e) => {
    e.preventDefault();
    const url = isLogin ? `${API_URL}/user/login` : `${API_URL}/user/register`;

    setLoading(true);
    try {
        const response = await axios.post(url, formData);
        setLoading(false);

        if (response.data.success) {
            toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");

            if (isLogin) {
                // Store the token and navigate after login
                localStorage.setItem('token', response.data.token);
                onLogin();
                navigate('/'); // Redirect to home page after login
            } else {
                setFormData({ name: '', email: '', password: '' }); // Clear the form fields
                setIsLogin(true); // Switch to login form
                
                toast.info('Registration successful! Please login.');
            }
        } else {
            toast.error(response.data.message); // Show error message from backend
        }
    } catch (error) {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
    }
};


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 max-w-screen-xl mx-auto ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
                    {isLogin ? 'Login to Your Account' : 'Create an Account'}
                </h2>
                <form onSubmit={handleLogin}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-orange-500"
                                placeholder="Enter your name"
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-orange-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-orange-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="w-4 h-4 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            isLogin ? 'Login' : 'Create Account'
                        )}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-orange-500 cursor-pointer ml-2"
                        >
                            {isLogin ? 'Create one here' : 'Login here'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;




