import {Outlet} from 'react-router-dom'

export default function CheckoutOrderLayout() {

    return (
        <div id='CheckoutOrderLayout-Container'>
            <h1>Thank you for your purchase!</h1>
            <Outlet/>            
        </div>
    )
}