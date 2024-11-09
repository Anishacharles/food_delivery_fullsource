import React, { useState } from 'react'
import Header from '../components/Header'
import ProductDisplay from '../components/ProductDisplay'
import FirmChain from '../components/FirmChain'
import FirmCollections from '../components/FirmCollections'
import ProductMenu from '../components/ProductMenu'
// import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
// import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
// import AppDownload from '../../components/AppDownload'

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <ProductDisplay/>
      <FirmChain/>
      <FirmCollections/>
      {/* <ProductMenu/> */}
      {/* <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/> */}
      {/* <AppDownload/> */}
    </>
  )
}

export default Home
