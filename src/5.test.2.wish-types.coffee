npmWishlist.Test::_check_equal = (actual, ruler, description = "") ->
    objects = [] # This variable is to avoid circular object/array.
    determine = (actual, ruler) =>
        if Array.isArray(actual) and Array.isArray(ruler)
            if ruler.every((m, index) =>
                if m in objects
                    npmWishlist.objectIs(actual[index], m)
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
                    npmWishlist.objectIs(actual[m], ruler[m])
                else
                    objects.push(ruler[m]) if typeof ruler[m] == "object" and ruler[m] != null
                    determine(actual[m], ruler[m])
            )
                true
            else
                false
        else
            npmWishlist.objectIs(actual, ruler)
    result =
        type: determine(actual, ruler)
        description: description
    if result.type == false
        result.actual = npmWishlist.valueToMessage(actual)
        result.expected = "= " + npmWishlist.valueToMessage(ruler)
    result
npmWishlist.Test::_check_notEqual = (actual, ruler, description = "") ->
    objects = [] # This variable is to avoid circular object/array.
    determine = (actual, ruler) =>
        if Array.isArray(actual) and Array.isArray(ruler)
            if ruler.some((m, index) =>
                if m in objects
                    not npmWishlist.objectIs(actual[index], m)
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
                    not npmWishlist.objectIs(actual[m], ruler[m])
                else
                    objects.push(ruler[m]) if typeof ruler[m] == "object" and ruler[m] != null
                    determine(actual[m], ruler[m])
            )
                true
            else
                false
        else
            not npmWishlist.objectIs(actual, ruler)
    result =
        type: determine(actual, ruler)
        description: description
    if result.type == false
        result.actual = npmWishlist.valueToMessage(actual)
        result.expected = "≠ " + npmWishlist.valueToMessage(ruler)
    result
npmWishlist.Test::_check_is = (actual, ruler, description = "") ->
    result =
        type: npmWishlist.objectIs(actual, ruler)
        description: description
    if result.type == false
        result.actual = npmWishlist.valueToMessage(actual)
        result.expected = "is " + npmWishlist.valueToMessage(ruler)
    result
npmWishlist.Test::_check_isnt = (actual, ruler, description = "") ->
    result =
        type: not npmWishlist.objectIs(actual, ruler)
        description: description
    if result.type == false
        result.actual = npmWishlist.valueToMessage(actual)
        result.expected = "isn't " + npmWishlist.valueToMessage(ruler)
    result
npmWishlist.Test::_check_throws = (fun, ruler, description = "") ->
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
    result =
        type: resultType
        description: description
    if result.type == false
        result.actual = if passed then "no exception" else "another exception"
        result.expected = if passed then "exception" else "an exception"
    result
npmWishlist.Test::_check_doesNotThrow = (fun, description = "") ->
    resultType =
        try
            fun()
            true
        catch
            false
    result =
        type: resultType
        description: description
    if result.type == false
        result.actual = "exception"
        result.expected = "no exception"
    result
npmWishlist.Test::_check_lessThan = (actual, ruler, description = "") ->
    result =
        type: actual < ruler
        description: description
    if result.type == false
        result.actual = npmWishlist.valueToMessage(actual)
        result.expected = "< " + npmWishlist.valueToMessage(ruler)
    result
npmWishlist.Test::_check_lessThanOrEqual = (actual, ruler, description = "") ->
    result =
        type: actual <= ruler
        description: description
    if result.type == false
        result.actual = npmWishlist.valueToMessage(actual)
        result.expected = "<= " + npmWishlist.valueToMessage(ruler)
    result
npmWishlist.Test::_check_greaterThan = (actual, ruler, description = "") ->
    result =
        type: actual > ruler
        description: description
    if result.type == false
        result.actual = npmWishlist.valueToMessage(actual)
        result.expected = "> " + npmWishlist.valueToMessage(ruler)
    result
npmWishlist.Test::_check_greaterThanOrEqual = (actual, ruler, description = "") ->
    result =
        type: actual >= ruler
        description: description
    if result.type == false
        result.actual = npmWishlist.valueToMessage(actual)
        result.expected = ">= " + npmWishlist.valueToMessage(ruler)
    result
