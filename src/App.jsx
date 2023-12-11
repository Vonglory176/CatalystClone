import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App

/*
Major breakpoints at: 600px, 960px, 1280px, 1920px

TODO
-------------------
Right now!
------
Add hover animations/transitions

Later!
------
Clean up SCSS
Finish Header
Add Header Drawer
Get rid of extra divs?
Fix email styling
Fix font styling in Product Card
Fix Collection-Link styling in Product card

(General)
Add Titles to anchors
Check out "lazysizes" & data-src

-------------------
*/