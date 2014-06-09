class npmWishes.Test
    constructor: (@description = "") ->
        @_children = []
        @_fun = =>
        @_wishes = []
        @async = false
        @parent = null
        @_resetContext()
    _resetContext: ->
        @env = {}
        @wishResults = []
        @result = null
    set: (fun) ->
        @_fun = fun
        @
    get: ->
        @_fun
    setWishes: (wishes) ->
        @_wishes = wishes
        @
    getWishes: ->
        @_wishes
    add: ->
        newChild = null
        if arguments[0] instanceof npmWishes.Test
            newChild = arguments[0]
        else
            description = fun = wishes = options = null
            if typeof arguments[0] == "string"
                description = arguments[0]
                fun = arguments[1]
                if typeof arguments[2] == "object" and arguments[2] != null and
                        not Array.isArray(arguments[2])
                    options = arguments[2]
                else
                    wishes = arguments[2]
                    options = arguments[3]
            else
                fun = arguments[0]
                if typeof arguments[1] == "object" and arguments[1] != null and
                        not Array.isArray(arguments[1])
                    options = arguments[1]
                else
                    wishes = arguments[1]
                    options = arguments[2]
            description ?= ""
            wishes ?= []
            options ?= {}
            newChild = new npmWishes.Test(description).set(fun).setWishes(wishes)
            if options.async
                newChild.async = true
        newChild.parent = @
        @_children.push(newChild)
        @
    addAsync: () ->
        args = []
        for m in arguments
            args.push(m)
        args.push({async: true})
        @add.apply(@, args)
    getChildren: ->
        # use a shallow copy to encapsule `_children` to prevent direct operation on the array
        @_children[..]
    getAncestors: ->
        test = @
        r = []
        while test.parent != null
            r.push(test.parent)
            test = test.parent
        r
    run: (showsMessage = true) ->
        @_resetContext()
        if @parent?
            @env = npmWishes.objectClone(@parent.env)
        # We use `setTimeout(..., 0)` only to make all tests "unordered", at least theoretically.
        setTimeout(=>
            result = null
            if exports? and module?.exports?
                domain = require("domain").create()
                domain.on("error", (error) =>
                    result =
                        type: false
                        errorMessage: """
                            Error Name: #{error.name}
                            Error Message: #{error.message}
                            Error Stack: #{error.stack}
                        """
                )
                domain.run(=> @_fun(@env, @))
            else
                try
                    @_fun(@env, @)
                catch
                    result = {type: false}
            if not result? and not @async
                result = {type: true}
            if result?
                @end(result)
        , 0)
        if showsMessage
            allTests = []
            allTests.push(@)
            traverse = (test) =>
                test.getChildren().forEach((m) =>
                    allTests.push(m)
                    traverse(m)
                )
            traverse(@)
            console.log()
            # TODO: Scanning for timeout is now also in this function. It's inaccurate because interval
            # is 1 sec. We may need to create another timer with shorter interval for that.
            timerJob = =>
                okTests = allTests.filter((m) => m.result? and m.result.type == true)
                exceptionTests = allTests.filter((m) => m.result? and m.result.type == false)
                pendingTests = allTests.filter((m) => not m.result?)
                console.log("#{new Date().toISOString()} OK: #{okTests.length}, " +
                        "Exception: #{exceptionTests.length}, Pending: #{pendingTests.length}")
                if pendingTests.length == 0
                    clearInterval(timer)
                    exceptionTests.forEach((m) =>
                        console.log("\n********** Exceptional Test **********")
                        console.log("Test: #{m.description}")
                        console.log("Function: #{m.get().toString()}")
                        console.log(m.result.errorMessage) if m.result.errorMessage?
                    )
                    failureCount = 0
                    markString = ""
                    allTests.forEach((m) => m.wishResults.forEach((n) =>
                        markString += " " + n.type.toString()
                        if n.type == false
                            failureCount++
                            ancestors = m.getAncestors()
                            ancestors.reverse()
                            longDescription = ancestors.concat([m]).map((m) => m.description).join(" --> ")
                            console.log("\n********** Failed Wish **********")
                            console.log("    Test: #{longDescription}")
                            console.log("    Wish: #{n.description}")
                            console.log("Expected: #{n.expected}")
                            console.log("  Actual: #{n.actual}")
                    ))
                    markString = markString.trim()
                    mark = npmWishes.sha256(markString).substr(0, 5)
                    console.log("\n" + (
                        if exceptionTests.length == 0 and failureCount == 0
                            "All tests are OK. All wishes succeeded."
                        else
                            "#{exceptionTests.length} Exceptional Tests, " +
                            "#{failureCount} Failed Wishes, " +
                            "Mark: #{mark}"
                    ) + "\n")
                    process.exit() if process?
            timer = setInterval(timerJob, 1000)
            # a delay slightly greater than 0 is useful for preventing a useless heartbeat
            # while there's no async test and computation takes very little time.
            setTimeout(timerJob, 10)
        @
    end: (result) ->
        @result = result ? {type: true}
        @getWishes().forEach((m) =>
            @checkWish(m)
        )
        @getChildren().forEach((m) =>
            m.run(false)
        )
        @
    checkWish: (wish) ->
        interpret = (s) =>
            npmWishes.parseExpression(s, Object.keys(@env)).forEach((m, index) =>
                insertedString = "this.env."
                pos = m + insertedString.length * index
                s = s.substr(0, pos) + insertedString + s.substr(pos)
            )
            s
        parsed = npmWishes.parseWish(wish)
        args = parsed.components.map((m, index) =>
            if index == parsed.components.length - 1
                m
            else
                interpret(m)
        )
        eval("this.#{parsed.type}(#{args.join(', ')})")
    equal: (actual, ruler, description = "") ->
        objects = [] # This variable is to avoid circular object/array.
        determine = (actual, ruler) =>
            if Array.isArray(actual) and Array.isArray(ruler)
                if ruler.every((m, index) =>
                    if m in objects
                        npmWishes.objectIs(actual[index], m)
                    else
                        objects.push(m) if typeof m == "object" and m != null
                        determine(actual[index], m)
                )
                    true
                else
                    false
            else if typeof actual == "object" and actual != null and
                    typeof ruler == "object" and ruler != null
                if Object.keys(ruler).every((m) =>
                    if ruler[m] in objects
                        npmWishes.objectIs(actual[m], ruler[m])
                    else
                        objects.push(ruler[m]) if typeof ruler[m] == "object" and ruler[m] != null
                        determine(actual[m], ruler[m])
                )
                    true
                else
                    false
            else
                npmWishes.objectIs(actual, ruler)
        newResult =
            type: determine(actual, ruler)
            description: description
        if newResult.type == false
            newResult.actual = npmWishes.valueToMessage(actual)
            newResult.expected = "= " + npmWishes.valueToMessage(ruler)
        @wishResults.push(newResult)
        @
    notEqual: (actual, ruler, description = "") ->
        objects = [] # This variable is to avoid circular object/array.
        determine = (actual, ruler) =>
            if Array.isArray(actual) and Array.isArray(ruler)
                if ruler.some((m, index) =>
                    if m in objects
                        not npmWishes.objectIs(actual[index], m)
                    else
                        objects.push(m) if typeof m == "object" and m != null
                        determine(actual[index], m)
                )
                    true
                else
                    false
            else if typeof actual == "object" and actual != null and
                    typeof ruler == "object" and ruler != null
                if Object.keys(ruler).some((m) =>
                    if ruler[m] in objects
                        not npmWishes.objectIs(actual[m], ruler[m])
                    else
                        objects.push(ruler[m]) if typeof ruler[m] == "object" and ruler[m] != null
                        determine(actual[m], ruler[m])
                )
                    true
                else
                    false
            else
                not npmWishes.objectIs(actual, ruler)
        newResult =
            type: determine(actual, ruler)
            description: description
        if newResult.type == false
            newResult.actual = npmWishes.valueToMessage(actual)
            newResult.expected = "≠ " + npmWishes.valueToMessage(ruler)
        @wishResults.push(newResult)
        @
    is: (actual, ruler, description = "") ->
        newResult =
            type: npmWishes.objectIs(actual, ruler)
            description: description
        if newResult.type == false
            newResult.actual = npmWishes.valueToMessage(actual)
            newResult.expected = "is " + npmWishes.valueToMessage(ruler)
        @wishResults.push(newResult)
        @
    isnt: (actual, ruler, description = "") ->
        newResult =
            type: not npmWishes.objectIs(actual, ruler)
            description: description
        if newResult.type == false
            newResult.actual = npmWishes.valueToMessage(actual)
            newResult.expected = "isn't " + npmWishes.valueToMessage(ruler)
        @wishResults.push(newResult)
        @
    throws: (fun, ruler, description = "") ->
        passed = false
        resultType =
            try
                fun()
                passed = true
                false
            catch error
                if not ruler?
                    true
                else if ruler instanceof RegExp
                    if ruler.test(error.message)
                        true
                    else
                        false
                else
                    if error instanceof ruler
                        true
                    else
                        false
        newResult =
            type: resultType
            description: description
        if newResult.type == false
            newResult.actual = if passed then "no exception" else "another exception"
            newResult.expected = if passed then "exception" else "an exception"
        @wishResults.push(newResult)
        @
    doesNotThrow: (fun, description = "") ->
        resultType =
            try
                fun()
                true
            catch
                false
        newResult =
            type: resultType
            description: description
        if newResult.type == false
            newResult.actual = "exception"
            newResult.expected = "no exception"
        @wishResults.push(newResult)
        @
# This function is equivalent to ECMAScript 6th's `Object.is`.
npmWishes.objectIs = (a, b) ->
    if typeof a == "number" and typeof b == "number"
        if a == 0 and b == 0
            1 / a == 1 / b
        else if isNaN(a) and isNaN(b)
            true
        else
            a == b
    else
        a == b
npmWishes.objectClone = (x) ->
    y = {}
    for key in Object.keys(x)
        y[key] = x[key]
    y
npmWishes.valueToMessage = (value) ->
    internal = (value, maxLevel) ->
        if value == undefined
            "undefined"
        else if value == null
            "null"
        else if Array.isArray(value)
            if maxLevel > 0
                "[" + value.map((m) -> internal(m, maxLevel - 1)).join(",") + "]"
            else
                "[Array]"
        else if typeof value == "function"
            "[Function]"
        else if typeof value == "object"
            if maxLevel > 0
                "{" + Object.keys(value).map((m) ->
                    "#{JSON.stringify(m)}:" + internal(value[m], maxLevel - 1)
                ).join(",") + "}"
            else
                "[Object]"
        else if typeof value == "string"
            JSON.stringify(value.toString())
        else if typeof value == "number"
            if npmWishes.objectIs(value, -0)
                "-0"
            else
                value.toString()
        else
            value.toString()
    r = internal(value, 3)
    r = internal(value, 2) if r.length > 1000
    r = internal(value, 1) if r.length > 1000
    r = internal(value, 0) if r.length > 1000
    r
