wishlist = npmWishlist ? require("../wishlist")
Test = wishlist.Test
new Test("root"
).add((my, I) ->
    I.wish(' true=true ')
).run()
