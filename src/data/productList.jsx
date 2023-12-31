const productList = {

    //BATTLETECH STARTS HERE !!!
    battletech: {
        0:{   
            id:"battletech-clan-invasion",
            universe: "BattleTech",
            name: "Clan Invasion",

            productTypes: "",
            tags: "",

            sharedImages: {
                0: {
                    name:"BackCover",
                    alt:"Back of the box",
                    link:"https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/products%2Fbattletech%2Fclan-invasion%2FBoxSpread.webp?alt=media&token=e65c26ca-db3b-4a9d-9c8f-591146bbd877"
                },
                
                1: {
                    name:"BoxSpread",
                    alt:"Spread contents of the box",
                    link:"https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/products%2Fbattletech%2Fclan-invasion%2FBoxSpread.webp?alt=media&token=e65c26ca-db3b-4a9d-9c8f-591146bbd877"
                }
            },
            
            variants: {
                
                type:"Version",
                
                choices: {
                    0: {
                        name: "Unlimited",
                        price: 49.99,
                        images: {
                            0: {
                                name:"UnlimitedBox",
                                alt:"The Unlimited box",
                                link:"https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/products%2Fbattletech%2Fclan-invasion%2FUnlimitedBox.webp?alt=media&token=135bd3a8-feb6-446c-b9a7-2e0e7a052e76"
                            }
                        }
                    },
                    1: {
                        name: "Kickstarter",
                        price: 49.99,
                        images: {
                            0: {
                                name:"BoxSpread",
                                alt:"The Kickstarter box",
                                link:"https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/products%2Fbattletech%2Fclan-invasion%2FKickStarterBox.webp?alt=media&token=2d3dee8a-3f0f-46f0-8142-00837d357a5b"
                            }
                        }
                    }
                }
            },

            description: "<div className='product-description'>Hello! This is a test.</div>"
            ,
        },
    },
    
    //SHADOWRUN STARTS HERE !!!
    shadowrun: {
        0:{   
            id:"shadowrun-sixth-world-core-rulebook-city-edition-berlin",
            universe: "Shadowrun",
            name: "Sixth World Core Rulebook: City Edition: Berlin",

            productTypes: "",
            tags: "",

            sharedImages: {
                0: {
                    name:"FrontCover",
                    alt:"Front cover of the rulebook",
                    link:"https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/products%2Fshadowrun%2Fsixth-world-core-rulebook-city-edition-berlin%2FSR6BerlinEdition.webp?alt=media&token=406f9f04-20c5-46ce-a437-6d5dea362167"
                }
            },
            
            variants: {
                
                type:"Version",
                
                choices: {
                    0: {
                        id: "book-pdf",
                        name: "Book (+PDF)",
                        price: 49.99,
                        images: {}
                    },
                    1: {
                        name: "PDF",
                        price: 19.99,
                        images: {}
                    },
                }
            },

            description: "<div className='product-description'>Hello! This is also a test.</div>",
        },
    },

    tabletop: {

    }
}

export default productList

/*
Query: -----------------------

"Write a Database for Firebase based off this request: 

I want a list of products, each sorted into three categories of "battletech", "shadowrun" and "tabletop. 

Each product has an id, a name, a description, a series of product-types, a series of tags, and a series of images.

Each product also has variants, and everything it had up to this point is shared between each variant it has. 

If more than one variant is present, the parent product with have a variant-type. 

Each variant will have a name, a price and one or more images unuiqe to itself.

Each image within both a product or variant will have a link, alt, and name.

Some products or variants can also be marked as free, sold out, on sale, a featured-product, or getting-started."


Response: ----------------------

"Based on your requirements, here's a suggested structure for your Firebase Database:"

{
    "products": {
        "battletech": {
            "product1": {
                "id": "product1",
                "name": "Product 1",
                "description": "This is product 1",
                "productTypes": ["type1", "type2"],
                "tags": ["tag1", "tag2"],
                "images": {
                    "image1": {
                        "link": "https://...",
                        "alt": "Image 1",
                        "name": "Image1"
                    },
                    // more images...
                },
                "variants": {
                    "variant1": {
                        "name": "Variant 1",
                        "price": 49.99,
                        "discountedPrice":39.99,
                        "images": {
                            "image2": {
                                "link": "https://...",
                                "alt": "Image 2",
                                "name": "Image2"
                            },
                            // more images...
                        },
                        "isFree": false,
                        "isSoldOut": false,
                        "isOnSale": true,
                        "isFeaturedProduct": false,
                        "isGettingStarted": false
                    },
                    // more variants...
                },
                "variantType": "Version",
                "isFree": false,
                "isSoldOut": false,
                "isOnSale": true,
                "isFeaturedProduct": false,
                "isGettingStarted": false
            },
            // more products...
        },
        "shadowrun": {
            // similar structure
        },
        "tabletop": {
            // similar structure
        }
    }
}
*/