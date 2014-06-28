if npmWishlist.environmentType == "browser"
    window.npmWishlist = npmWishlist
if npmWishlist.moduleSystem == "commonjs"
    module.exports = npmWishlist
