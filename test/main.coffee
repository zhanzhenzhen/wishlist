wishes =
    if exports? and module?.exports?
        require("../wishes")
    else
        npmWishes
Test = wishes.Test
new Test("root"
).add(->
    unit(' true=true ')
).run()
