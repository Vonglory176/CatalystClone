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
import Addresses from './pages/Addresses'
import Downloads from './pages/Downloads'
import Order from './pages/Order'

import { Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from './store/products-slice'
import { fetchUserDetails } from './store/auth-slice'
import { getAuth } from 'firebase/auth'

function App() {
  const auth = getAuth()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  //So refresh only occurs on path change, not changes like query
  // const { pathname, search, state } = useLocation()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProducts())
    if (isLoggedIn) dispatch(fetchUserDetails())
  }, [location.pathname]) //dispatch //location //status

  return ( 
    <>
      {/* ROUTER VIDEO --> https://youtu.be/Ul3y1LXxzdU */}
      {/* Browser for deploy, Memory for dev? */}
      {/* Use similar to /products/:id for details page*/}

      <Routes>
        {/* Home Page */}
        <Route element={<SlideShowLayout/>}>
          <Route path="/" element={<Home/>}/>
        </Route>

        <Route element={<MainLayout/>}>
          {/* Cart & Checkout */}
          <Route path="/cart" element={<Cart/>}/>
              
          {/* Account */}
          <Route path="/account" element={auth.currentUser ? <Account /> : <Navigate to="/account/login" replace state={{ from: location.pathname + location.search}} />}/>

          {/* Account Required Pages "Login to continue" */}
          <Route path="/" element={auth.currentUser ? <Outlet /> : <Navigate to="/account/login" replace state={{ ...location.state, from: location.pathname + location.search, message: "Login to continue" }} />}>
            {/* <Route index element={<Account/>}/> */}
            <Route path="account/addresses" element={<Addresses/>}/>
            <Route path="account/downloads" element={<Downloads/>}/>
            <Route path={"account/order"} element={<Order/>}/>
            <Route path={"cart/success"} element={<Order/>}/> {/* Need extra measures to keep secure */}
            
            <Route path="cart/checkout" element={<Cart/>}/> {/* REMOVE TO USE GUEST CHECKOUT - ONLY LOGGED IN USERS CAN CHECKOUT*/}
          </Route>

          {/* Login handler */}
           <Route path="/account" element={!auth.currentUser ? <Outlet /> : <Navigate to={location.state?.from || '/account'} state={{...location.state}} replace />}> {/* element={!isLoggedIn ? <Outlet /> : <Navigate to="/account" replace />} */}
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
          </Route>
          
          {/* Logout handler */}
          <Route path="/account/logout" element={isLoggedIn ? <Logout/> : <Navigate to={location.state?.from || '/'} replace state={{ from: location.state?.from || '/'}} />} />
          
          {/* Product Pages */}
          <Route path="/collections/:id" element={<Collections/>}/>
          <Route path="/products/:id" element={<Products/>}/>
          {/* <Route path="/collections/:id/products/:id" element={<Products/>}/> */}

          <Route path="/contact" element={<Contact/>}/>
          {/* <Route path="/products" element={<Products/>}/> Make this a category page? */}
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  )
}    
export default App

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
    SEARCH STUFF

    useParams() --> For passing data
    useSearchParams() --> For maintaining State in the Searchbar. 
    (Good for keeping things like filters, where a link might be sent from one to another)

    const [searchParams, setSearchParams] = useSearchParams({n:3}) // WORKS LIKE useState()!!!!
    const number = searchParams.get("n") --> 3
    <input type="number" value={number} onChange={e => setSearchParams({ n: e.target.value})
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
Prime Features!
------
Password Recovery
Guest Checkout
"Back to" banners ?

Do Right now!
------
useMemo()?

USER AUTH TOKENS FOR ALL ACCOUNT RELATED STUFF !!! --> https://firebase.google.com/docs/auth/admin/verify-id-tokens

Do Later!
------

GUEST CHECKOUT ------------------------------------
There are two ways to view orders (account/order && cart/success). Account requires login and "cart/success" will need...
... tailoring to make things more loose but secure, especially for guests (Timeout idea?)

Create logic to "timeout" the order details after X time (24hrs?)?
Digital items?

ACCOUNT ------------------------------------
CLEANING: Method of getting product-link in orderHistory is scuffed, maybe fix? (USE STRIPE METADATA)

DOWNLOADS ------------------------------------
BUG: Need to solve issue with storing data. Can't have duplicate product entries, but also need to distinguish variants
ADD PROPER FILE TYPE TO DOWNLOAD

CHECKOUT/CART ------------------------------------
MINOR: Type issue with saving digital items to order metadata ("checkoutCart.cjs")
CLEANING: Auto-Checkout/Checkout is insane and needs cleanup

GENERAL ------------------------------------
Implement lazyloading & react-progressive-image (NOT TO EVERYTHING THOUGH... At least animation wise)
Add better image placeholders
HTML Labels, Aria, etc

COLLECTION-BLOCK ------------------------------------
CLEANING: Clean up auto product load code

CONTACT ------------------------------------
Give form a use or disable






PLATFORM TESTING ------------------ ||||||||||||||||||||||||||||||||||||||||
Chrome
Opera
Firefox
Edge
Safari

iOS
Android (Use Emulator)

ON THE BACK BURNER --------------------- |||||||||||||||||||||||||||||||||||||||||||

HEADER ------------------------------------
Create close button for notification?
MINOR: Sticky header pops out on deactivation

HOME ------------------------------------
Add images to slideshow?

PRODUCT CARD ------------------------------------
MINOR: Text overflow can still be improved

NOTIFICATIONS/ERROR HANDLING ------------------------------------
Standard/Centralize error message code

LOGOUT ------------------------------------------------
Bad styling (Not vertically centered)

ORDERS/HISTORY ------------------------------------
MINOR: If an order (Not the most recent) is deleted from the database, creating a new one overwrites the most recent

CHECKOUT/CART ------------------------------------
Add copy of redux-cart (Prod/VarIDs' into Stripe metadata)?
Change cart checkout item removal to only those in the order?

ADDRESSES ------------------------------------
BUG: Address "isDefaultAddress" counts as difference
Make address form required
Default address on top?

CART/PRODUCTS -----------------------------
Implement SKU

CHECKOUT ----------------------------
Shipping Fees

SEARCH ------------------------------
MINOR: "Each child in list should have a key"
MINOR: Clicking search-icon, a different window and then where search-results WOULD have been makes it appear ??
Include categories / pages as well as products in search? (Would need database changes)

DOWNLOADS ------------------------------------
Add mock download, like just the product picture?

ORDERS/HISTORY ------------------------------------
Add pagination?

FOOTER ------------------------------------
MINOR: Fix icon link spacing?
Add classes to footer links?

CONTACT ------------------------------------
For practice reasons, make the form an "Uncontrolled Component"
Finish Styling

COLLECTIONS ------------------------------------
MINOR: Search-Results "jumps" at bottom for a moment when changing category

CHECKOUT SUCCESS / ORDERS ------------------------------------


*/