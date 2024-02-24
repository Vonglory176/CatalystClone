import {Outlet} from 'react-router-dom'

export default function AccountOrderLayout() {

    return (
        <div id='AccountOrderLayout-Container'>
            <h1>My Account</h1>
            <Outlet/>            
        </div>
    )
}