import { useState, useEffect } from "react"

export default function AddressForm({formTitle, prevAddress, submissionCallback, cancelCallback}) {

    const [userAddress, setUserAddress] = useState({
        firstName: "",
        lastName: "",
        company: "",
        address1: "",
        address2: "",
        city: "",
        country: "United States",
        province: "Placeholder",
        postalCode: "",
        phone: "",
        isDefaultAddress: false,
        ...prevAddress //Whatever is loaded in overwrites the previous
    })
    // country: prevAddress? prevAddress.country || "United States" : "United States",
    // province: prevAddress? prevAddress.province || "Placeholder" : "Placeholder",
    // isDefaultAddress: prevAddress? prevAddress.isDefaultAddress : false,

    const handleAddressFormSubmit = (e) => {
        e.preventDefault()

        // console.log(e.target.elements)
        submissionCallback({...userAddress}, prevAddress)
            
            // firstName: e.target.elements['firstName'].value,
            // lastName: e.target.elements['lastName'].value,
            // company: e.target.elements['company'].value,
            // address1: e.target.elements['address1]'].value,
            // address2: e.target.elements['address2]'].value,
            // city: e.target.elements['city'].value,
            // country: e.target.elements['country'].value,
            // province: e.target.elements['province'].value,
            // postalCode: e.target.elements['postalCode'].value,
            // phone: e.target.elements['phone'].value,
            // isDefaultAddress: e.target.elements['setDefault'].checked

            // firstName: e.target.elements['address[firstName]'].value,
            // lastName: e.target.elements['address[lastName]'].value,
            // company: e.target.elements['address[company]'].value,
            // address1: e.target.elements['address[address1]'].value,
            // address2: e.target.elements['address[address2]'].value,
            // city: e.target.elements['address[city]'].value,
            // country: e.target.elements['address[country]'].value,
            // province: e.target.elements['address[province]'].value,
            // postalCode: e.target.elements['address[postalCode]'].value,
            // phone: e.target.elements['address[phone]'].value,
            // isDefaultAddress: e.target.elements['address[setDefault]'].checked
        
    }

    const handleInputChange = (e) => {
        //For checkbox
        if (e.target.name === "setDefault") setUserAddress({...userAddress, isDefaultAddress: e.target.checked})
        //For all else
        else setUserAddress({...userAddress, [e.target.name]: e.target.value})
        // console.log(e.target.name, e.target.value)
    }

    // useEffect(() => {
    //     console.log(userAddress)
    // }, [userAddress])

    return (
        <form method="POST" action="/account/addresses" className="address-form" onSubmit={handleAddressFormSubmit}>
            <h2>{formTitle}</h2>
            {/* <div> */}
            <div className="address-form__input-pair">
                {/* First Name */}
                <div className="address-form__input">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" value={userAddress.firstName} onChange={handleInputChange} id={`Address-Form__FirstName`} />
                </div>
                {/* Last Name */}
                <div className="address-form__input">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" value={userAddress.lastName} onChange={handleInputChange} id={`Address-Form__LastName`} />
                </div>
            </div>

            {/* Company */}
            <div className="address-form__input">
                <label htmlFor="company">Company</label>
                <input type="text" name="company" value={userAddress.company} onChange={handleInputChange} id={`Address-Form__Company`} />
            </div>
            {/* Address 1 */}
            <div className="address-form__input">
                <label htmlFor="address1">Address 1</label>
                <input type="text" name="address1" value={userAddress.address1} onChange={handleInputChange} id={`Address-Form__Address1`} />
            </div>
            {/* Address 2 */}
            <div className="address-form__input">
                <label htmlFor="address2">Address 2</label>
                <input type="text" name="address2" value={userAddress.address2} onChange={handleInputChange} id={`Address-Form__Address2`} />
            </div>

            <div className="address-form__input-pair">
                {/* City */}
                <div className="address-form__input">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" value={userAddress.city} onChange={handleInputChange} id={`Address-Form__City`} />
                </div>
                {/* Country */}
                <div className="address-form__input">
                    <label htmlFor="country">Country</label>
                    <select name="country" value={userAddress.country} onChange={handleInputChange} id={`Address-Form__Country`}>
                        <option value="United States">United States</option>
                    </select>
                </div>
            </div> 

            {/* Province */}
            <div className="address-form__input">
                <label htmlFor="province">Province</label>
                <select name="province" value={userAddress.province} onChange={handleInputChange} id={`Address-Form__Province`}>
                    <option value="Placeholder">PLACEHOLDER</option>
                </select>
            </div>

            <div className="address-form__input-pair">
                {/* Postal Code */}
                <div className="address-form__input">
                    <label htmlFor="postalCode">Postal/Zip Code</label>
                    <input type="text" name="postalCode" value={userAddress.postalCode} onChange={handleInputChange} id={`Address-Form__PostalCode`} />
                </div>
                {/* Phone */}
                <div className="address-form__input">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" value={userAddress.phone} onChange={handleInputChange} id={`Address-Form__Phone`} />
                </div>
            </div>

            {/* Set Default */}
            <div className="address-form__input-checkbox">
                <input type="checkbox" name="setDefault" checked={userAddress.isDefaultAddress} onChange={handleInputChange} id={`Address-Form__SetDefault`} />
                <label htmlFor="setDefault">Set as default address</label>
            </div>
            {/* </div> */}
            <input type="submit" className="btn" value={formTitle.split(" ")[0] + " Address"}/>
            <input type="button" className="btn" value="Cancel" onClick={cancelCallback}/>
        </form>
    )
}

