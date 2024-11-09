import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from './Login';
import Register from './Register';
import Addrestaurant from './Addrestaurant';
import AddProduct from './AddProduct';
import DashBoard from '../components/DashBoard';
import AllProducts from '../components/AllProducts';
import OrderPage  from './OrderPage';



const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true)

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
        setShowLogOut(true)
        setShowWelcome(true)
    }
  }, [])

  useEffect(()=>{
      const firmName = localStorage.getItem('firmName');
      const firmId = localStorage.getItem('firmId')
      if(firmName || firmId ){
          setShowFirmTitle(false)
          setShowWelcome(true)
      }
  },[])

  // const toggleOrderPage = () => {
  //   setShowOrderPage(!showOrderPage);
  // };


  const logOutHandler =()=>{
    confirm("Are you sure to logout?")
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem('firmName');
      setShowLogOut(false)
      setShowFirmTitle(true)
      setShowWelcome(false)
  }

const showLoginHandler =()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    setShowOrders(false);

}

const showRegisterHandler = ()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    setShowOrders(false);

}

const showFirmHandler = ()=>{
  if(showLogOut){
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(true)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    setShowOrders(false);
  }else{
    alert("please login");
    setShowLogin(true)
  }
}
const showProductHandler = ()=>{
  if(showLogOut){
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(true)
    setShowWelcome(false)
    setShowAllProducts(false)
    setShowOrders(false);
    }else{
        alert("please login")
        setShowLogin(true)
    }

}
const showWelcomeHandler = ()=>{
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(true)
    setShowAllProducts(false)
    setShowOrders(false);

}
const showAllProductsHandler = ()=>{
  
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(true)
    setShowOrders(false);
}

    const showOrderPage = () => {
      if(showLogOut){
      setShowFirm(false);
      setShowProduct(false);
      setShowAllProducts(false);
      setShowOrders(true);
    }

else{
    alert("please login")
    setShowLogin(true)
 }
}
  // return (
  //   <>
  //       <section className="landingSection min-h-screen flex flex-col bg-gray-100">
  //           <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler}
  //           showLogOut = {showLogOut}
  //           logOutHandler = {logOutHandler}
  //           />
  //           <div className="sideBarSection w-60 bg-gray-800 text-white h-full p-4">
  //           <SideBar showFirmHandler={showFirmHandler} showProductHandler ={showProductHandler}
  //           showAllProductsHandler = {showAllProductsHandler}
  //           showFirmTitle={showFirmTitle}
  //           />
            
  //         {showFirm && showLogOut && <Addrestaurant />}
  //         {showProduct && showLogOut && <AddProduct />}
  //         {showWelcome && <DashBoard />}
  //         {showAllProducts && showLogOut && <AllProducts />}
  //         {showLogin && <Login showWelcomeHandler ={showWelcomeHandler}/>}
  //         {showRegister && <Register showLoginHandler = {showLoginHandler}/>}
  //         </div>
            
  //       </section>
  //   </>
  // )
  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />
        <div className="flex">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
            showOrderPage={showOrderPage}
          />
          {/* <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={toggleOrderPage}
      >
        {showOrderPage ? 'Hide Orders' : 'Show Orders'}
      </button> */}
          {showFirm && showLogOut && <Addrestaurant />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <DashBoard />}
          {showAllProducts && showLogOut && <AllProducts />}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showOrderPage && showLogOut && <OrderPage />}
        </div>
      </section>
    </>
  );
  
}

export default LandingPage