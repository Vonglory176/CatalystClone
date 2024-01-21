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
        console.log(status)
    }, [dispatch, pathname]) //location //status

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


Later!
------
Create search
Add some reducer extension things to disable quantity buttons/input while updating

DATABASE ---
Put Firebase config in ENV file !!!!!!

Add more products to ProductList ?
Add stock numbers to products ?

FILTERS / SORT / PAGINATION ---
Make pages reset whenever filters change
Make mobile rendition of filters
Finish styling

COLLECTION-BLOCK ---

Write logic for determining Featured/NewArrival-Section? (Still uncertain of manual or auto load)
Collect all Featured Products and random load into collection-blocks?
Load products into Featured-Containers? (Just use ID's for the moment)

PRODUCT RESULT/CARD ---
Add sale code
Finish styling

PRODUCT PAGE ---
Finish ability to expand image on click
Add vertical image carousel
Add a "BACK TO X" banner for page when coming from a collection
Finish styling

Add code to make product page search database faster? (Like only look in battletech, not all cats)
Make a category page at "/products"?
Add a share on social media div?

NOTIFICATIONS/ERROR HANDLING ---
Add errors to store/products/card/result if not found?
Add general notification stuff (Added to cart, signed-in/out etc)
Create alert for product/price changes (Would need to be monitored in state)
Alert for Product Filter Tags resetting after Filter Type change?

Figure out some kind of way to update/alert to product/cart changes on cart/checkout page
(Always alerts initially in regard to things like stock/quantity, both on product/cart page)
(Cart page has an "Update Cart" button)

CHECKOUT/CART ---
Look into Shopify redirects
Needs more steps/checks to verify quantity/price changes
Write code for changeItemQuantity/Input

COLLECTIONS ---
Make sure filter sidebar doesn't extend main result container
Change banners/collection-blocks based on the collection
Look into issue where going from /battletech straight to /shadowrun causes issue with 'cannot split null' (Jank fix with 'reloadDocument' on header Links)
Have a Universe filter on "collection/all" page?
Make page buttons set view to page top?
Finish styling

Continue to look into cleaning/breaking up code (Also remember Pagination/Filters components)
(REMEMBER DISCORD SCREENSHOT/in coding)

FEATURED PRODUCT BANNER ---
Continue building the FeaturedProductBanner component/file
Make it!!!

HEADER ---
Fix weird mobile-tablet snapping issue?
Make searchbar (in sidebar + other)(Searchanise??)
Make + rotate when universe cat opened?
Make Universe button a link when focused
Add link highlighting when on affiliated page

HOME ---
Add random character images to collection-blocks (Obviously collection-block also need tweaks)
Add btn class to homepage-mailform?
Add images to slideshow?

FOOTER ---
Add classes to footer links

CONTACT ---
Add form functionality?
Finish Styling

ACCOUNT ---
Add actual login/auth mechanics
Get Captcha for Login/Register?
Populate account details (Especially purchase history!!)

GENERAL ---
Figure out how to rotate properly in mobile
Make scrollbar hidden in MOBILE view, not just small views
Implement lazyloading & react-progressive-image
Learn how to preload images? Especially in places like products (GZIP)
Make small placeholder versions of all images
Add better image placeholders
Add sizes to images
SCSS Cleanup / Standardization (Font/Headers/Buttons especially) ((AND COLORS))
HTML Cleanup
Add Titles to anchors
Add FavIcon !!!!!!
-------------------
*/