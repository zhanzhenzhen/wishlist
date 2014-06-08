###

This is to test the "test". The output should look something like this:

2014-06-01T18:45:48.237Z OK: 13, Exception: 0, Pending: 1
2014-06-01T18:45:49.231Z OK: 13, Exception: 0, Pending: 1
2014-06-01T18:45:50.232Z OK: 13, Exception: 0, Pending: 1
2014-06-01T18:45:51.232Z OK: 14, Exception: 0, Pending: 0

********** Failed Unit **********
    Test: root --> String.prototype test
    Unit: wrongStr.split(" ")=["hello","world"]
Expected: = ["hello","world"]
  Actual: ["helloo","world"]

********** Failed Unit **********
    Test: root --> String.prototype test
    Unit: wrongStr.split(" ")=["hello","world"]
Expected: = ["hello","world"]
  Actual: ["helloo","world"]

********** Failed Unit **********
    Test: root --> 
    Unit: var1=var2
Expected: = 1234
  Actual: 111

********** Failed Unit **********
    Test: root --> 
    Unit: var2<>a
Expected: ≠ 1234
  Actual: 1234

********** Failed Unit **********
    Test: root --> 
    Unit: 1+2+3=7
Expected: = 7
  Actual: 6

********** Failed Unit **********
    Test: root --> 
    Unit: (obj.unit>1)=true
Expected: = true
  Actual: false

********** Failed Unit **********
    Test: root --> nested test --> test 2 in nested test
    Unit: simple boolean test
Expected: = true
  Actual: false

********** Failed Unit **********
    Test: root --> nested var
    Unit: var1 is var2
Expected: is 8888
  Actual: 111

********** Failed Unit **********
    Test: root --> nested var
    Unit: var3=1
Expected: = 1
  Actual: 222

********** Failed Unit **********
    Test: root --> nested var --> 
    Unit: var1=var2
Expected: = 8888
  Actual: 111

********** Failed Unit **********
    Test: root --> simple test 2
    Unit: var2=true
Expected: = true
  Actual: 1234

********** Failed Unit **********
    Test: root --> 
    Unit: ("1"===2)=true
Expected: = true
  Actual: false

********** Failed Unit **********
    Test: root --> 
    Unit: {} is {}
Expected: is {}
  Actual: {}

********** Failed Unit **********
    Test: root --> 
    Unit: [] is []
Expected: is []
  Actual: []

********** Failed Unit **********
    Test: root --> 
    Unit: null<>null
Expected: ≠ null
  Actual: null

********** Failed Unit **********
    Test: root --> 
    Unit: undefined<>undefined
Expected: ≠ undefined
  Actual: undefined

********** Failed Unit **********
    Test: root --> 
    Unit: sampleNaN1=1
Expected: = 1
  Actual: NaN

********** Failed Unit **********
    Test: root --> 
    Unit: NaN= 3
Expected: = 3
  Actual: NaN

********** Failed Unit **********
    Test: root --> 
    Unit: '' =NaN
Expected: = NaN
  Actual: ""

********** Failed Unit **********
    Test: root --> 
    Unit: 0=-0
Expected: = -0
  Actual: 0

********** Failed Unit **********
    Test: root --> 
    Unit: 0 is -0
Expected: is -0
  Actual: 0

********** Failed Unit **********
    Test: root --> 
    Unit: -0 is 0
Expected: is 0
  Actual: -0

********** Failed Unit **********
    Test: root --> 
    Unit: b throws
Expected: exception
  Actual: no exception

********** Failed Unit **********
    Test: root --> 
    Unit: a throws /kkk/
Expected: an exception
  Actual: another exception

********** Failed Unit **********
    Test: root --> 
    Unit: a throws CustomError
Expected: an exception
  Actual: another exception

********** Failed Unit **********
    Test: root --> 
    Unit: a
Expected: no exception
  Actual: exception

********** Failed Unit **********
    Test: root --> 
    Unit: /=/.test("=")=false
Expected: = false
  Actual: true

********** Failed Unit **********
    Test: root --> 
    Unit: "\""="\"abc"
Expected: = "\"abc"
  Actual: "\""

********** Failed Unit **********
    Test: root --> 
    Unit: 123<>123
Expected: ≠ 123
  Actual: 123

********** Failed Unit **********
    Test: root --> 
    Unit: {a:1,b:2}<>{a:1,b:2}
Expected: ≠ {"a":1,"b":2}
  Actual: {"a":1,"b":2}

********** Failed Unit **********
    Test: root --> 
    Unit: NaN isnt NaN
Expected: isn't NaN
  Actual: NaN

********** Failed Unit **********
    Test: root --> 
    Unit: {a:1,b:2}={a:1,b:2,c:function(){}}
Expected: = {"a":1,"b":2,"c":[Function]}
  Actual: {"a":1,"b":2}

********** Failed Unit **********
    Test: root --> 
    Unit: {a:{a:{a:{a:{}}}}}={a:{a:{a:{a:1}}}}
Expected: = {"a":{"a":{"a":[Object]}}}
  Actual: {"a":{"a":{"a":[Object]}}}

********** Failed Unit **********
    Test: root --> 
    Unit: circularObj isnt circularObj
Expected: isn't {"a":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[3,4]}
  Actual: {"a":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[3,4]}

********** Failed Unit **********
    Test: root --> 
    Unit: circularObj <> circularObj
Expected: ≠ {"a":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[3,4]}
  Actual: {"a":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[3,4]}

********** Failed Unit **********
    Test: root --> 
    Unit: circularObj is circularObj2
Expected: is {"a":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[3,4]}
  Actual: {"a":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[3,4]}

********** Failed Unit **********
    Test: root --> 
    Unit: circularObj = circularObj2
Expected: = {"a":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[3,4]}
  Actual: {"a":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[3,4]}

********** Failed Unit **********
    Test: root --> 
    Unit: circularWrapper is circularWrapper2
Expected: is {"content":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[5,6]}
  Actual: {"content":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[5,6]}

********** Failed Unit **********
    Test: root --> 
    Unit: circularWrapper <> circularWrapper2
Expected: ≠ {"content":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[5,6]}
  Actual: {"content":{"a":{"a":[Object],"b":[Array]},"b":[3,4]},"b":[5,6]}

********** Failed Unit **********
    Test: root --> 
    Unit: veryLongCircularObj1=veryLongCircularObj2
Expected: = {"me":[Object],"secondMe":[Object],"thirdMe":[Object],"meArray":[Array],"a":"............................................................","b":"............................................................","c":"............................................................","d":"............................................................","e":"............................................................","f":"............................................................","g":"............................................................","h":"............................................................","i":"............................................................","j":"............................................................","k":"............................................................","l":"............................................................"}
  Actual: {"me":[Object],"secondMe":[Object],"thirdMe":[Object],"meArray":[Array],"a":"............................................................","b":"............................................................","c":"............................................................","d":"............................................................","e":"............................................................","f":"............................................................","g":"............................................................","h":"............................................................","i":"............................................................","j":"............................................................","k":"............................................................","l":"............................................................"}

********** Failed Unit **********
    Test: root --> 
    Unit: veryLongCircularObj1 is veryLongCircularObj2
Expected: is {"me":[Object],"secondMe":[Object],"thirdMe":[Object],"meArray":[Array],"a":"............................................................","b":"............................................................","c":"............................................................","d":"............................................................","e":"............................................................","f":"............................................................","g":"............................................................","h":"............................................................","i":"............................................................","j":"............................................................","k":"............................................................","l":"............................................................"}
  Actual: {"me":[Object],"secondMe":[Object],"thirdMe":[Object],"meArray":[Array],"a":"............................................................","b":"............................................................","c":"............................................................","d":"............................................................","e":"............................................................","f":"............................................................","g":"............................................................","h":"............................................................","i":"............................................................","j":"............................................................","k":"............................................................","l":"............................................................"}

********** Failed Unit **********
    Test: root --> 
    Unit: [
    1, 2, 3,
    "asdf", "jkl",
    {
        yyy: 4,
        iii: 5,
        jjj: NaN,
        kkk: null,
        "mmm e": -9,
        d: undefined
    }
]
=
[
    1, 2, 3,
    "asdf", "jkl",
    {
        yyy: 4,
        iii: 5,
        jjj: NaN,
        kkk: null,
        "mmm e": -10,
        d: undefined
    }
]
Expected: = [1,2,3,"asdf","jkl",{"yyy":4,"iii":5,"jjj":NaN,"kkk":null,"mmm e":-10,"d":undefined}]
  Actual: [1,2,3,"asdf","jkl",{"yyy":4,"iii":5,"jjj":NaN,"kkk":null,"mmm e":-9,"d":undefined}]

0 Exceptional Tests, 42 Failed Units, Mark: 9f39f

###

if exports? and module?.exports?
    Test = require("../wishes").Test
else
    Test = npmWishes.Test
new Test("root"
).add("String.prototype test", (v) ->
    v.str = "hello world"
    v.wrongStr = "helloo world"
, [
    ' str.substr(4,1)="o" ',
    ' str.split(" ")=["hello","world"] ',
    ' str.split(" ")=["hello","world"] ',
    ' wrongStr.substr(4,1)="o" ',
    ' wrongStr.split(" ")=["hello","world"] ',
    ' wrongStr.split(" ")=["hello","world"] '
]).run()
