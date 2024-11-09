
import React, { useState } from 'react';
import { API_URL } from '../route/Path';

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const loginHandler = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${API_URL}/vendor/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       alert('Login success');
  //       setEmail("");
  //       setPassword("");
  //       localStorage.setItem('loginToken', data.token);
  //       showWelcomeHandler();

  //       const vendorId = data.vendorId;
  //       const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
  //       const vendorData = await vendorResponse.json();
  //       if (vendorResponse.ok) {
  //         const vendorFirmId = vendorData.vendorFirmId;
  //         const vendorFirmName = vendorData.vendor.firm[0].firmName;
  //         localStorage.setItem('firmId', vendorFirmId);
  //         localStorage.setItem('firmName', vendorFirmName);
  //       }

  //       window.location.reload();
  //     } else {
  //       alert('Login failed');
  //     }
  //   } catch (error) {
  //     alert('Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      console.log("Response Status:", response.status); // Check status
      console.log("Response Data:", data); // Check response data
  
      if (response.ok) {
        alert('Login success');
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token);
        showWelcomeHandler();
  
        // Fetch vendor information
        const vendorId = data.vendorId;
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        const vendorData = await vendorResponse.json();
        if (vendorResponse.ok) {
          const vendorFirmId = vendorData.vendorFirmId;
          const vendorFirmName = vendorData.vendor.firm[0].firmName;
          localStorage.setItem('firmId', vendorFirmId);
          localStorage.setItem('firmName', vendorFirmName);
        }
  
        window.location.reload();
      } else {
        alert(`Login failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert('Login failed due to server or network error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
   
    <div className="w-full flex flex-col justify-center items-center">
        {loading ? (
          <div className="loaderSection flex flex-col items-center z-50">
            <p className="text-lg mt-2">Login in process... Please wait</p>
          </div>
        ) : (
         
          <form
          className="w-full max-w-[50%] flex flex-col items-center border border-gray-400 rounded-lg p-6 relative mt-[-230px]"
           onSubmit={loginHandler} autoComplete="off">
  <h3 className="text-xl font-semibold mb-4">Vendor Login</h3>
  
  <label className="w-full max-w-[55%] font-normal mb-1">Email</label>
  <input
    type="text"
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
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
    >
      Submit
    </button>
  </div>
</form>

        )}
      </div>
    
  );

};

export default Login;
