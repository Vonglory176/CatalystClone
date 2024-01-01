import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Account from './pages/Account'
import Cart from './pages/Cart'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import MainLayout from './layout/MainLayout'
import SlideShowLayout from './layout/HomeLayout'
import Register from './pages/Register'
import Logout from './pages/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from './store/firebase-slice'

function App() {

  const dispatch = useDispatch()
    const productList = useSelector(state => state.firebase.productList)
    const status = useSelector(state => state.firebase.status)
    const error = useSelector(state => state.firebase.error)
    const location = useLocation()

    useEffect(() => {
        // if(status === 'idle') {
            dispatch(fetchProducts())
        // }
        console.log(status)
    }, [dispatch, location]) //status

  return ( 
    <>
      {/* ROUTER VIDEO --> https://youtu.be/Ul3y1LXxzdU */}
      {/* Browser for deploy, Memory for dev? */}
      {/* Use similar to /products/:id for details page*/}

      <Routes>
        <Route element={<SlideShowLayout/>}>
          <Route path="/" element={<Home/>}/>
        </Route>

        <Route element={<MainLayout/>}>
          <Route path="/cart" element={<Cart/>}/>

          <Route path="/account">
            <Route index element={<Account/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="logout" element={<Logout/>}/>
            <Route path="register" element={<Register/>}/>
          </Route>

          <Route path="/collections/:id" element={<Collections/>}/>
          <Route path="/collections/:id/products/:id" element={<Products/>}/>

          <Route path="/contact" element={<Contact/>}/>
          <Route path="/products" element={<Products/>}/> 

          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  )
}    
export default App

/* 
    Home
    Account / (Login Register Logout Addresses)
    Cart
    Collections / (All GettingStarted Battletech Shadowrun Tabletop)
    Products / (**Product Name**) 
    pages/search-results-page?q=clan
    pages / Contact
    404 Page Not Found
*/

/*  
    <Link to={"!#"} className={""}></Link> 

    "replace" attr --> Removes the current page from history, skipped when pressing back (Good for logins)
    "reloadDocument" attr --> Click on a Link and the entire page is reloaded (Not just the changing section)
    "state={}" --> Good for passing data from one place to another
*/

/* 
    <NavLink // "isActive" is true when on the link
    to="" 
    style={({ isActive }) => {return isActive ? {color:"red"} : {}}} //NavLink is red when on its' page
    className="" 
    children
    end>

      {({ isActive }) => {return isActive ? "Active Home" : "Home"}} //Changes text when on its' page

    </NavLink> These can take functions
*/

/*
    STATE USE
    
    //First page
    <NavLink to="/" state="Hi">Home</NavLink> 

    //Second Page
    const location = useLocation() //An object that has {hash:"" key:"" pathname:"" search:"" state:""}
*/

/*
    useParams() --> For passing data
    useSearchParams() --> For maintaining State in the Searchbar. 
    (Good for keeping things like filters, where a link might be sent from one to another)

    const [searchParams, setSearchParams] = useSearchParams({n: 3})
    const number = searchParams.get("n")
    onChange={e => setSearchParams({n: e.target.value})}

*/

/*
    FOR REDIRECTS !!!

    <Navigate to="/" /> For simple redirects

    const navigate = useNavigate() //For more comprehensive use, better in general (Especially for Forms!)

    navigate("/", {replace, state}) //Back to home
    navigate(-1) //Same as hitting the back button
  */

/*

TODO
-------------------
Right now!
------
Load products into Featured-Containers (Just use ID's for the moment)

FOCUS ON PRODUCTS - Next comes page tailoring (Like background)
ADD SALE CODE TO PRODUCT RESULTS
Add errors to store/products if not found?
Finish conditional hell in products


Later!
------
Clean up SCSS
Add Featured Product Banner !
Finish Header
Make sticky header ---> GET import {useInView} from 'react-intersection-observer'
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
Add styling to Account Page
Add code to ProductResult in collections to include "From" if more than one option
Finish Product page styling
Add more products to ProductList !!!!!!!!
Add code to make product page search database faster? (Like only look in battletech, not all cats)

(General)
Add Titles to anchors
Check out "lazysizes" & data-src
Add FavIcon !!!!!!

Get Captcha for Login/Register
Get Search from Searchanise
Setup MongoDB/FireBase thing for products? (JS file doesn't allow easy filter/querying)
-------------------
*/