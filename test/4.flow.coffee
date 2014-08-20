steps.push(->
    console.log("----- Flow -----")
    new Test(
    ).set((v, t) ->
        v.a = 1
    ).add(
        new Test(
        ).after((v) ->
            console.log("after 1")
            jkjk()
        )
    ).addAsync((v, t) ->
        setTimeout(->
            t.end()
        , 2500)
    ).after((v) ->
        console.log(v.a)
        v.a = 2
        console.log(v.a)
        console.log("after 2")
    ).run()
)
