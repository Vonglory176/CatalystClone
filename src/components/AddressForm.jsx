export default function AddressForm({formTitle, submissionCallback, cancelCallback}) {

    const handleAddressFormSubmit = (e) => {
        e.preventDefault()
        
        const elements = e.target.elements
        submissionCallback({
            firstName: elements['address[firstName]'].value,
            lastName: elements['address[lastName]'].value,
            company: elements['address[company]'].value,
            address1: elements['address[address1]'].value,
            address2: elements['address[address2]'].value,
            city: elements['address[city]'].value,
            country: elements['address[country]'].value,
            province: elements['address[province]'].value,
            postalCode: elements['address[postalCode]'].value,
            phone: elements['address[phone]'].value,
            setDefault: elements['address[setDefault]'].value
        })
    }

    return (
        <form method="POST" action="/account/addresses" className="address-form" onSubmit={handleAddressFormSubmit}>
            <h2>{formTitle}</h2>
            {/* <div> */}
            <div className="address-form__input-pair">
                {/* First Name */}
                <div className="address-form__input">
                    <label htmlFor="address[firstName]">First Name</label>
                    <input type="text" name="address[firstName]" id={`Address-Form__FirstName`} />
                </div>
                {/* Last Name */}
                <div className="address-form__input">
                    <label htmlFor="address[lastName]">Last Name</label>
                    <input type="text" name="address[lastName]" id={`Address-Form__LastName`} />
                </div>
            </div>

            {/* Company */}
            <div className="address-form__input">
                <label htmlFor="address[company]">Company</label>
                <input type="text" name="address[company]" id={`Address-Form__Company`} />
            </div>
            {/* Address 1 */}
            <div className="address-form__input">
                <label htmlFor="address[address1]">Address 1</label>
                <input type="text" name="address[address1]" id={`Address-Form__Address1`} />
            </div>
            {/* Address 2 */}
            <div className="address-form__input">
                <label htmlFor="address[address2]">Address 2</label>
                <input type="text" name="address[address2]" id={`Address-Form__Address2`} />
            </div>

            <div className="address-form__input-pair">
                {/* City */}
                <div className="address-form__input">
                    <label htmlFor="address[city]">City</label>
                    <input type="text" name="address[city]" id={`Address-Form__City`} />
                </div>
                {/* Country */}
                <div className="address-form__input">
                    <label htmlFor="address[country]">Country</label>
                    <select name="address[country]" id={`Address-Form__Country`}> {/* FIND LIST TO USE */}
                        <option value="US">United States</option>
                    </select>
                </div>
            </div> 

            {/* Province */}
            <div className="address-form__input">
                <label htmlFor="address[province]">Province</label>
                <select name="address[province]" id={`Address-Form__Province`}> {/* FIND LIST TO USE */}
                    <option value="Placeholder">PLACEHOLDER</option>
                </select>
            </div>

            <div className="address-form__input-pair">
                {/* Postal Code */}
                <div className="address-form__input">
                    <label htmlFor="address[postalCode]">Postal/Zip Code</label>
                    <input type="text" name="address[postalCode]" id={`Address-Form__PostalCode`} />
                </div>
                {/* Phone */}
                <div className="address-form__input">
                    <label htmlFor="address[phone]">Phone</label>
                    <input type="text" name="address[phone]" id={`Address-Form__Phone`} />
                </div>
            </div>

            {/* Set Default */}
            <div className="address-form__input-checkbox">
                <input type="checkbox" name="address[setDefault]" id={`Address-Form__SetDefault`}/>
                <label htmlFor="address[setDefault]">Set as default address</label>
            </div>
            {/* </div> */}
            <input type="submit" className="btn" value={formTitle.split(" ")[0] + " Address"}/>
            <input type="button" className="btn" value="Cancel" onClick={cancelCallback}/>
        </form>
    )
}

