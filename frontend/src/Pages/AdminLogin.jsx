import React from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login" , {
                email, password
            }
        );
        console.log(response);
            
        } catch (error) {
            console.error('Login failed:', error);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-gray-100 space-y-6">
            <h1 className="font-Pacific text-3xl text-white">Admin Login </h1>
            <div className="border shadow p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={ handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className="w-full px-3 py-2 border"
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border"
                            placeholder='***********' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Forgot password?</a>
                    </div>
                    <div className="mb-4">
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>   
        </div>
    );
}

export default Login;