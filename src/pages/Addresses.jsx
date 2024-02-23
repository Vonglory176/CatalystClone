import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createNewUserAddress, removeUserAddress, updateUserAddress } from "../store/auth-slice"

import AddressForm from "../components/AddressForm"

export default function Addresses() {
    //If not logged in, redirect to Login page ("replace" so back button works)
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    // const navigate = useNavigate()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (!isLoggedIn) navigate("/account/login", {replace:true})
    // }, [isLoggedIn])

    const {addresses} = useSelector(state => state.auth.user)
    const [currentAddresses, setCurrentAddresses] = useState()
    const [addAddress, setAddAddress] = useState(false)
    const [updateAddress, setUpdateAddress] = useState({}) //This become an object array via useEffect
    
    const printAddresses = () => {
        // No Addresses
        if (!addresses || addresses.length === 0) return <p><strong>No addresses found</strong></p>

        // Addresses found
        let addressListHtml = []
        for (let index in addresses) {
            const address = addresses[index]

            addressListHtml.push(
            <div className="address-container" key={index}>
                {address.isDefaultAddress && <p><strong>Default</strong></p>}
                <p>
                    {address.firstName} {address.lastName} {(address.firstName || address.lastName) && <br/>}
                    {address.company} {address.company && <br/>}
                    {address.country} {address.country && <br/>}
                    {address.address1} {address.address1 && <br/>}
                    {address.address2} {address.address2 && <br/>}
                    {/* Add phone? */}
                    {address.city} {address.province} {address.postalCode} {(address.city || address.province || address.postalCode) && <br/>}
                </p>
                <div className="address-container__button-group">
                    <input type="button" value="Edit" onClick={() => handleUpdateAddressOnClick(index)} className="address-container__button"/>
                    <input type="button" value="Delete" onClick={() => dispatch(removeUserAddress(address))} className="address-container__button"/>
                </div>
                {updateAddress[index] && <AddressForm formTitle="Edit Address" prevAddress={address} submissionCallback={updateAddressCallback} cancelCallback={() => handleUpdateAddressOnClick(index)}></AddressForm>}
            </div>
            )

            if (Number(index) !== addresses.length -1) addressListHtml.push(<hr key={index + "hr"}/>)
        }
        return addressListHtml
    }

    // Address Initialization
    useEffect(() => {        
        let updateAddressList = []
        for (let address in addresses.length) updateAddressList.push(false)

        setUpdateAddress(updateAddressList)
    }, [addresses])

    // Address Printing/Updating (Could combine with above but has indexing issue with Remove function)
    useEffect(() => {
        setCurrentAddresses(printAddresses())
        console.log(updateAddress)
    }, [updateAddress]) //addresses, 

    // Opening/Closing the Edit forms
    const handleUpdateAddressOnClick = (index) => {
        setUpdateAddress({...updateAddress, [index]:!updateAddress[index]})
        // setUpdateAddress(prev => prev.map((value, i) => i === Number(index) ? !value : value))
    }

    // Callbacks to send new address to Redux
    const newAddressCallback = (newAddress) => {
        console.log(newAddress)
        dispatch(createNewUserAddress(newAddress))
        setAddAddress(false)
    }

    const updateAddressCallback = (updatedAddress, prevAddress) => {
        dispatch(updateUserAddress({updatedAddress, prevAddress}))
        console.log(updatedAddress)
    }


    return (
        <div id="Account-Container">
            <h1>My Account</h1>

            {addAddress && <AddressForm formTitle="Add a New Address" submissionCallback={newAddressCallback} cancelCallback={() => setAddAddress(false)}></AddressForm>}

            <div className="content-block">
                <h2>Your Addresses</h2>
                <div className="addresses">
                    {currentAddresses}
                </div>
                
            </div>

            {!addAddress && <input type="button" value="Add A New Address" className="btn" onClick={() => setAddAddress(true)}/>}
        </div>
    )
}


{/* <div className="content-block">
    <h3>Account Details</h3>
    <p>
        {address.firstName} {address.lastName} {(address.firstName || address.lastName) && <br/>}
        {address.country} {address.country && <br/>}
        {address.address1} {address.address1 && <br/>}
        {address.address2} {address.address2 && <br/>}
        {address.city} {address.province} {address.postalCode} {(address.city || address.province || address.postalCode) && <br/>}
    </p>
</div> */}