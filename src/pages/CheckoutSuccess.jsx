import {useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'

export default function CheckoutSuccess() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(() => {
        // Get the sessionId parameter from the URL
        const sessionId = searchParams.get('sessionId')
        console.log(sessionId)

        // const orderRed = ref(getDatabase(),)        
    }, [searchParams])

    return (
        <div>
            <h1>Thank you for your purchase!</h1>
        </div>
    )
}

