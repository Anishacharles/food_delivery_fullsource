
// import React from 'react';

// const DashBoard = () => {
//   const firmName = localStorage.getItem("firmName");

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//         Welcome to {firmName}
//       </h2>
//       <div className="landingImage w-full max-w-sm">
//         <img
//           src="/assets/cheffood.png"
//           alt="dashboard"
//           className="w-full h-auto rounded-lg shadow-lg"
//         />
//       </div>
//     </div>
//   );
// };

// export default DashBoard;

import React from 'react'

const DashBoard = () => {
    const firmName = localStorage.getItem("firmName")

  // return (
  //   <div className='welcomeSection'>
  //       <h2>Welcome {firmName}</h2>
  //       <div className="landingImage">
  //         <img src="/assets/cheffood.png" alt='welcome' />
  //       </div>
  //   </div>
  // )
  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl text-center relative -top-20 text-blue-600">
        Welcome to {firmName}
      </h2>
      <div className="w-full flex items-center justify-center mt-[-100px]">
        <img src="/assets/cheffood.png" alt='welcome'/>
      </div>
    </div>
  );
  
}

export default DashBoard