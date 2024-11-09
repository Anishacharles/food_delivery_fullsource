import React, { useState } from 'react';
import { API_URL } from '../route/Path';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error);
        alert("Registration Failed, Contact Admin");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  
  // return (
  //   <div className="w-full flex flex-col justify-center items-center">
  //     {loading ? (
  //       <div className="loaderSection flex flex-col items-center">
  //         <p className="text-lg">Hi, your registration is in process...</p>
  //       </div>
  //     ) : (
  //       <form
  //         className="w-full max-w-[50%] mt-[-230px] flex flex-col items-center border border-gray-400 rounded-lg p-6 shadow-lg"
  //         onSubmit={handleSubmit}
  //         autoComplete="off"
  //       >
  //         <h3 className="text-xl font-semibold mb-4">Vendor Register</h3>
          
  //         <label className="w-full max-w-[55%] font-normal mb-1">Username</label>
  //         <input
  //           type="text"
  //           name="username"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //           placeholder="Enter your name"
  //           className="w-full max-w-[55%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm text-gray-800"
  //         />
          
  //         <label className="w-full max-w-[55%] font-normal mb-1">Email</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           placeholder="Enter your email"
  //           className="w-full max-w-[55%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm text-gray-800"
  //         />
          
  //         <label className="w-full max-w-[55%] font-normal mb-1">Password</label>
  //         <input
  //           type={showPassword ? "text" : "password"}
  //           name="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           placeholder="Enter your password"
  //           className="w-full max-w-[55%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm text-gray-800"
  //         />
          
  //         <span
  //           className="showPassword cursor-pointer mt-2 text-sm text-purple-600"
  //           onClick={handleShowPassword}
  //         >
  //           {showPassword ? 'Hide' : 'Show'} Password
  //         </span>
    
  //         <div className="btnSubmit mt-6">
  //           <button
  //             type="submit"
  //             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
  //           >
  //             Submit
  //           </button>
  //         </div>
  //       </form>
  //     )}
  //   </div>
  // );
  return (
    <div className="w-full flex flex-col mt-20 justify-center items-center">
      {loading ? (
        <div className="loaderSection flex flex-col items-center z-50">
          <p className="text-lg"> Hi, your registration is in process...</p>
        </div>
      ) : (
        <form
          className="w-full max-w-[50%] flex flex-col items-center border border-gray-400 rounded-lg p-6 relative mt-[-230px]"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3 className="text-xl font-semibold mb-4">Vendor Register</h3>
          
          <label className="w-full max-w-[55%] font-normal mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full max-w-[55%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

          
          <label className="w-full max-w-[55%] font-normal mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
           className="w-full max-w-[55%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          <label className="w-full max-w-[55%] font-normal mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full max-w-[55%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          <span
            className="showPassword cursor-pointer text-blue-600"
            onClick={handleShowPassword}
          >
            {showPassword ? 'Hide' : 'Show'} Password
          </span>
    
          <div className="btnSubmit mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}  

export default Register;