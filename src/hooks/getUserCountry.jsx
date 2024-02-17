export const fetchUserCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      if (response.ok) {
        const data = await response.json()
        console.log(data.country_name) // Logs the country name
        return data.country_name
      } else {
        console.error('Failed to fetch country')
        return null
      }
    } catch (error) {
      console.error('Error fetching country:', error)
      return null
    }
  }