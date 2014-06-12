wishlist =
    if exports? and module?.exports?
        require("../wishlist")
    else
        npmWishlist
Test = wishlist.Test
new Test("root"
).add(->
    unit(' true=true ')
).run()
