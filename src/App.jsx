import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Account from './pages/Account'
import Cart from './pages/Cart'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import Products from './pages/Products'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/collections" element={<Collections/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/account/login" element={<Login/>}/>
      <Route path="/products" element={<Products/>}/>
    </Routes>

    {/* <Link to={"!#"} className={""}></Link> */}
    </>
  )
}

export default App

/*

TODO
-------------------
Right now!
------

Later!
------
Clean up SCSS
Add Featured Product Banner !
Finish Header
Make sticky header
Make searchbar (in sidebar + other)
Get rid of extra divs?
Fix email styling
Add images to slideshow
Add classes to footer links
Add random images to product sections?
Finish Contact Styling
Make alt view for non-empty cart
Give page names an ID?
Add btn class to homepage-mailform

(General)
Add Titles to anchors
Check out "lazysizes" & data-src

-------------------
*/