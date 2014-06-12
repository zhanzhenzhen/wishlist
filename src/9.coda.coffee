if npmWishlist.environmentType == "browser"
    window.npmWishlist = npmWishlist
else if npmWishlist.environmentType == "node"
    module.exports = npmWishlist
else
    throw new Error()
