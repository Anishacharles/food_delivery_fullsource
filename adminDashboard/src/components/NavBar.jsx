import React from 'react';

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {
  const firmName = localStorage.getItem('firmName');

  return (
    // <div className="navSection flex justify-between items-center p-4 bg-gray-800 text-white">
    //   <div className="company text-2xl font-bold">Vendor Dashboard</div>
    //   <div className="firmName">
    //     <h4 className="text-lg">Firm Name: {firmName}</h4>
    //   </div>
    //   <div className="userAuth">
    //     {!showLogOut ? (
    //       <>
    //         <span
    //           onClick={showLoginHandler}
    //           className="cursor-pointer hover:text-blue-400"
    //         >
    //           Login
    //         </span>
    //         <span className="mx-2">/</span>
    //         <span
    //           onClick={showRegisterHandler}
    //           className="cursor-pointer hover:text-blue-400"
    //         >
    //           Register
    //         </span>
    //       </>
    //     ) : (
    //       <span
    //         onClick={logOutHandler}
    //         className="logout cursor-pointer text-red-500 hover:text-red-700"
    //       >
    //         Logout
    //       </span>
    //     )}
    //   </div>
    // </div>
    <div className="h-[80px] flex justify-between bg-[#F46036] items-center text-white px-5 text-lg">
  <div className="company cursor-pointer ">Vendor Dashboard</div>
  <div className="firmName">
    <h4>Firm Name: {firmName}</h4>
  </div>
  <div className="userAuth cursor-pointer">
    {!showLogOut ? (
      <>
        <span onClick={showLoginHandler}>Login / </span>
        <span onClick={showRegisterHandler}>Register</span>
      </>
    ) : (
      <span onClick={logOutHandler} className="logout cursor-pointer">
        Logout
      </span>
    )}
  </div>
</div>

  );
};

export default NavBar;
