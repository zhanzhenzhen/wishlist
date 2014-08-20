steps.push(->
    console.log("----- Flow -----")
    new Test(
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
        console.log("after 2")
    ).run()
)
