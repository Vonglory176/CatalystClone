export const displayDateTime = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000)

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }
    const formattedDate = date.toLocaleDateString('en-US', options)

    return formattedDate
}

export const displayDate = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000)

    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = date.toLocaleDateString('en-US', options)

    return formattedDate
}