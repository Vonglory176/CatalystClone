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

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  //So refresh only occurs on path change, not changes like query
  // const { pathname, search, state } = useLocation()
  const location = useLocation()

  useEffect(() => {
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
          <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/account/login" replace state={{ from: location.pathname + location.search}} />}/>

          {/* Account Required Pages "Login to continue" */}
          <Route path="/" element={isLoggedIn ? <Outlet /> : <Navigate to="/account/login" replace state={{ ...location.state, from: location.pathname + location.search, message: "Login to continue" }} />}>
            {/* <Route index element={<Account/>}/> */}
            <Route path="account/addresses" element={<Addresses/>}/>
            <Route path="account/downloads" element={<Downloads/>}/>
            <Route path={"account/order"} element={<Order/>}/>
            <Route path={"cart/success"} element={<Order/>}/> {/* Need extra measures to keep secure */}
            
            <Route path="cart/checkout" element={<Cart/>}/> {/* REMOVE TO USE GUEST CHECKOUT - ONLY LOGGED IN USERS CAN CHECKOUT*/}
          </Route>

          {/* Login handler */}
           <Route path="/account" element={!isLoggedIn ? <Outlet /> : <Navigate to={location.state?.from || '/account'} state={{...location.state}} replace />}> {/* element={!isLoggedIn ? <Outlet /> : <Navigate to="/account" replace />} */}
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
          </Route>
          
          {/* Logout handler */}
          <Route path="/account/logout" element={isLoggedIn ? <Logout/> : <Navigate to={location.state?.from || '/'} replace state={{ from: location.state?.from || '/'}} />} />
          
          {/* Product Pages */}
          <Route path="/collections/:id" element={<Collections/>}/>
          <Route path="/collections/:id/products/:id" element={<Products/>}/>

          <Route path="/contact" element={<Contact/>}/>
          {/* <Route path="/products" element={<Products/>}/> Make this a category page? */}
          <Route path="/products/:id" element={<Products/>}/>
          
          {/* 404 Page */}
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
Captcha
Guest Checkout
"Back to" banners ?

Do Right now!
------
useMemo()?

USER AUTH TOKENS FOR ALL ACCOUNT RELATED STUFF !!! --> https://firebase.google.com/docs/auth/admin/verify-id-tokens
Auto-Checkout/Checkout is insane and needs cleanup

BUG: Notification occasionally does not stick to top in mobile?
MINOR: Login page routing screws with history due to inital Account page routing
Only get fresh account details when needed given the new setup?
Find other places to use load screen?
Move Fetch calls into Redux

Logout page has bad styling

Do Later!
------
GUEST CHECKOUT ------------------------------------
There are two way to view orders (account/order && cart/success). Account requires login and success will need...
... Tailoring to make things more loose but secure, especially for guests (Timeout idea?)

Create logic to "timeout" the order details after X time (24hrs?) (Maybe just for guests?)
Create a guest token for viewing guest orders?
Figure out what to do for guest checkout? (Especially for digital items)

CHECKOUT SUCCESS / ORDERS ------------------------------------
Create logic to only be able to view the order details if the user is logged in (With same UID)
Implement or remove SKU
Add styling (MOBILE VIEW ESPECIALLY)

If no order found, set timeout and try again?

ACCOUNT ------------------------------------
BUG: Async hiccups after creating account. Watch console/redirects (Redirection also has some momentary confusion)
MINOR: Account Login/Create info shows in the network console. Not big concern, but maybe go back to server auth?

Standardize and cleanup html/scss naming w/Orders (MESSY)
Figure out what more to do with "Account Details"
Get Captcha for Login/Register?
Method of getting product-link in orderHistory is scuffed, maybe fix? (USE STRIPE METADATA)
Standardize styling by expanding on layout stuff?
Implement password recovery
Finish styling

Change password styling?
Membership page? (Very likely not)

DOWNLOADS ------------------------------------
Add mock download, like just the product picture?
Add styling to downloads page (Size images properly, similar to cart)
ADD PROPER FILE TYPE TO DOWNLOAD

ORDERS/HISTORY ------------------------------------
BUG: Reverse load order to be list most recent orders first (Maybe allow sorting?)
MINOR: If an order (Not the most recent) is deleted from the database, creating a new one overwrites the most recent

Standardize and cleanup html/scss naming w/Orders
Add max-height and scrollbar to order details/history
Display Customer-Instructions?

CHECKOUT/CART ------------------------------------

Implement SKU to products, even if not for stock-count (Research Stripe for this first)

Change cart checkout item removal to only those in the order
Add copy of redux-cart (Prod/VarIDs' into Stripe metadata)
Write code for changeItemQuantity/Input
Add some reducer extension things to disable quantity buttons/input while updating

AFTER PURCHASE - Create outcome notif via https://stripe.com/docs/payments/after-the-payment

MINOR: Type issue with saving digital items to order metadata ("checkoutCart.cjs")

Addresses have no use (Maybe remove?)
Look more into shipping fees?
Create notification for checkout failure? (Like card is declined)
Finish styling (MAKE MOBILE VIEW FOR ORDER TABLE)

More steps/checks to verify quantity/price changes? (Update prices via Stripe maybe?)
Prevent/Add a warning to the purchase of an already owned electronic item?

SEARCH ------------------------------------
ERROR: Add a key to productSearchResult
ERROR: Weird null issue in products after multiple sequential search-product-result clicks (SPECIFIC TO VARIANTS "selectedVariant")

Make magnifying-icon a search submit button

Add Aria capability?
Include categories / pages as well as products in search? (Would need database changes)

PRODUCT PAGE ------------------------------------
BUG: Equalize Image & Desc when no thumbnail gallery (Display block + margins seemed to work)
BUG: Add a height limit to main image

Add some reducer extension things to disable quantity buttons/input while updating
Maybe add default size to pictures (General picture style changes)
Finish styling (Image container min/max + popin on orientation change)

Disable scrollbar on image gallery fullscreen?
Add a "BACK TO X" banner for page when coming from a collection?
Add code to make product page search database faster? (Like only look in battletech, not all cats)
Make a category page at "/products"?
Add a share on social media div?

COLLECTIONS ------------------------------------
BUG: Sorting causes lag
BUG: Scrollbar pop in/out bug when selecting filters?
BUG: Lag with selector (Maybe in products too?)
BUG: Clicking the same header-nav (or category-filter) link while already on the page adds to history (Make links a button that replace searchParams?)
BUG: ProductResult name overflows
BUG: Unchecking a type filter does not reset tag filters

Cut down on renders (it's bad)
Fix header button/text wrapping ("Results for" has issues somewhat)
Finish mobile filter styling

Disable category buttons if none to display?
Have a Universe filter on "collection/all" page?
Make page buttons set view to page top?

NOTIFICATIONS/ERROR HANDLING ------------------------------------
Add errors to store/products/card/result if not found?

Figure out some kind of way to update/alert to product/cart changes on cart/checkout page ?
(Always alerts initially in regard to things like stock/quantity, both on product/cart page)
(Cart page has an "Update Cart" button)

GENERAL ------------------------------------
BUG: Sale/Standard price swap bug from before is still present (At least on home page)
BUG: Don't allow Nav/Link spam to add to history (Header & Collections // USE SMART LINK WRAP THING (in discord))
MINOR: Change site background to black for when "Main-Layout" pages are too short for screen

Figure out how to rotate properly in mobile
Make scrollbar hidden in MOBILE view, not just small views
Implement lazyloading & react-progressive-image (NOT TO EVERYTHING THOUGH... At least animation wise)
Make small placeholder versions of all images
Add better image placeholders
Add sizes to images
SCSS Cleanup / Standardization (Font/Headers/Buttons especially) ((AND COLORS))
HTML Cleanup
Add Titles to anchors
Add FavIcon !!!!!!

OPTIONAL & LESS-IMPORTANT ------------------------------------ |||||||||||||||||||||||||||||||

ADDRESSES ------------------------------------
BUG: Address "isDefaultAddress" counts as difference
Make address form required
Default address on top?
Maybe remove?

COLLECTION-BLOCK ------------------------------------
Grab X products for New-Arrivals/Featured-Products (Depends on Universe too)
Load products into Featured-Containers in home? (Just use ID's for the moment)

HOME ------------------------------------
Set standard size to collection-buttons (Still small issue being short height when none have loaded)
Add images to slideshow?
Slideshow image load in clips bottom border

FEATURED PRODUCT BANNER ------------------------------------
Add link stuff

PRODUCT CARD ------------------------------------
Issue with text overflow
Add sale signifier
Finish styling

FILTERS / SORT / PAGINATION ------------------------------------
Finish styling
Add clear filter button?

DATABASE ------------------------------------
Look into registration of Redux stuff
Add hasVariants?
Add more products to ProductList ?
Add stock numbers to products ?

HEADER ------------------------------------
BUG: Sticky header pops in on first render

Create close button for notification
Make Universe button a link when focused

Add a drop down notification banner for general use?
Make + rotate when universe cat opened?
Maybe tweak sidebar styling?

CONTACT ------------------------------------
For practice reasons, make the form an "Uncontrolled Component"
Add form functionality?
Finish Styling

FOOTER ------------------------------------
Fix icon link spacing?
Add classes to footer links?
-------------------


PLATFORM TESTING ------------------
Chrome
Opera
Firefox
Edge
Safari

iOS
Android (Use Emulator)
*/