function translatePrice(price) {
    return new Intl.NumberFormat('en-US', { //Make 'en-US' swappable?
        style: 'currency',
        currency: 'USD'
    }).format(price / 100)
}

export default translatePrice