# This function is equivalent to ECMAScript 6th's `Object.is`.
npmWishlist.objectIs = (a, b) ->
    if typeof a == "number" and typeof b == "number"
        if a == 0 and b == 0
            1 / a == 1 / b
        else if isNaN(a) and isNaN(b)
            true
        else
            a == b
    else
        a == b
npmWishlist.objectClone = (x) ->
    y = {}
    for key in Object.keys(x)
        y[key] = x[key]
    y
npmWishlist.valueToMessage = (value) ->
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
            if npmWishlist.objectIs(value, -0)
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
