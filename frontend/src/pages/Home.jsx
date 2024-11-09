import React, { useState } from 'react'
import Header from '../components/Header'
import ProductDisplay from '../components/ProductDisplay'
import FirmChain from '../components/FirmChain'
import FirmCollections from '../components/FirmCollections'
import ProductMenu from '../components/ProductMenu'


const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <ProductDisplay/>
      <FirmChain/>
      <FirmCollections/>
     
    </>
  )
}

export default Home
