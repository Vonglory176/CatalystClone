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

import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from './store/products-slice'


function App() {

  const dispatch = useDispatch()
    // const productList = useSelector(state => state.products.productList)
    const status = useSelector(state => state.products.status)
    // const error = useSelector(state => state.products.error)

    // const location = useLocation()
    const { pathname } = useLocation() //So refresh only occurs on path change, not changes like query

    useEffect(() => {
        // if(status === 'idle') {
            dispatch(fetchProducts())
        // }
        // console.log(status)
    }, [pathname]) //dispatch //location //status

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
            <Route path="addresses" element={<Addresses/>}/>
          </Route>

          <Route path="/collections/:id" element={<Collections/>}/>
          <Route path="/collections/:id/products/:id" element={<Products/>}/>

          <Route path="/contact" element={<Contact/>}/>
          {/* <Route path="/products" element={<Products/>}/> Make this a category page? */}
          <Route path="/products/:id" element={<Products/>}/>

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
Right now!
------
Move registration code calls to Redux auth?
Finish Addresses page
Account Login/Create info shows in the network console. Not big concern, but maybe go back to server auth?
USE currentUser TO PERSIST DATA? Just get Account page populated
Implement Account features (LOGIN FIRST, Create, Recover, etc)
Also need to add sub-pages for Downloadables, Membership, Addresses(?) & Order-Details
Change password styling?

BUG: Sale/Standard price swap bug from before is still present (At least on home page)

Later!
------
Add some reducer extension things to disable quantity buttons/input while updating

SEARCH ---
ERROR: Add a key to productSearchResult
ERROR: Weird null issue in products after multiple sequential search-product-result clicks (SPECIFIC TO VARIANTS "selectedVariant")

Make magnifying-icon a search submit button

Add Aria capability?
Include categories / pages as well as products in search? (Would need database changes)

PRODUCT PAGE ---
BUG: Equalize Image & Desc when no thumbnail gallery (Display block + margins seemed to work)
BUG: Add a height limit to main image

Maybe add default size to pictures (General picture style changes)
Finish styling (Image container min/max + popin on orientation change)

Disable scrollbar on image gallery fullscreen?
Add a "BACK TO X" banner for page when coming from a collection?
Add code to make product page search database faster? (Like only look in battletech, not all cats)
Make a category page at "/products"?
Add a share on social media div?

CHECKOUT/CART ---
Write code for changeItemQuantity/Input
WRITE CODE FOR ADDRESS DETAIL USE

STRIPE WEBHOOK TRIGGERS + S-FUNCTION 
AFTER PURCHASE - Redirect to (Account/Cart?) - Create outcome notif via https://stripe.com/docs/payments/after-the-payment
AFTER PURCHASE - If successful, clear the cart
Figure out a way to get electronic products bound to an account, especially if purchased as guest
Also figure out how to record address jazz (If at all?)
When checkout is clicked, create local redux list of cart items to keep record in case of removal during checkout

Add a warning to the purchase of an already owned electronic item?
Needs more steps/checks to verify quantity/price changes?

COLLECTIONS ---
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

ACCOUNT ---
Add actual login/auth mechanics
Populate account details (Especially purchase history!!)

Get Captcha for Login/Register?

NOTIFICATIONS/ERROR HANDLING ---
Add errors to store/products/card/result if not found?
Add general notification stuff (Added to cart, signed-in/out etc)
Create alert for product/price changes (Would need to be monitored in state)
Alert for Product Filter Tags resetting after Filter Type change?

Figure out some kind of way to update/alert to product/cart changes on cart/checkout page
(Always alerts initially in regard to things like stock/quantity, both on product/cart page)
(Cart page has an "Update Cart" button)

GENERAL ---
Don't allow Nav/Link spam to add to history (Header & Collections // USE SMART LINK WRAP THING (in discord))
Figure out how to rotate properly in mobile
Make scrollbar hidden in MOBILE view, not just small views
Implement lazyloading & react-progressive-image
Make small placeholder versions of all images
Add better image placeholders
Add sizes to images
SCSS Cleanup / Standardization (Font/Headers/Buttons especially) ((AND COLORS))
HTML Cleanup
Add Titles to anchors
Add FavIcon !!!!!!

OPTIONAL & LESS-IMPORTANT ------------------------------------

COLLECTION-BLOCK ---
Grab X products for New-Arrivals/Featured-Products (Depends on Universe too)
Load products into Featured-Containers in home? (Just use ID's for the moment)

HOME ---
Set standard size to colection-buttons (Still small issue being short height when none have loaded)
Collection button margin issue on larger views
Add btn class to homepage-mailform?
Add images to slideshow?
Slideshow image load in clips bottom border

FEATURED PRODUCT BANNER ---
Add link stuff

PRODUCT CARD ---
Issue with text overflow
Add sale signifier
Finish styling

FILTERS / SORT / PAGINATION ---
Finish styling
Add clear filter button?

DATABASE ---
Look into registration of Redux stuff
Add hasVariants?
Add more products to ProductList ?
Add stock numbers to products ?

HEADER ---
BUG: Sticky header buttons pop-in/out when changing pages 

Make Universe button a link when focused

Add a drop down notification banner for general use?
Make + rotate when universe cat opened?
Maybe tweak sidebar styling?

CONTACT ---
For practice reasons, make the form an "Uncontrolled Component"
Add form functionality?
Finish Styling

FOOTER ---
Fix icon link spacing?
Add classes to footer links?
-------------------
*/