# Wishlist

Wishlist makes your test more natural, more readable, less redundant, and thus speeds up your test writing.

Example:

```javascript
var Test = require("wishlist").Test;

new Test().add(
  function(my) {
    my.money = 2500;
  },
  ' money>1000;money>2000;money>3000 '
).run();
```

It shows:

```
********** Broken Wish **********
    Test:  --> 
    Wish: money>3000
Expected: > 3000
  Actual: 2500

Tests OK. 1 wishes of 3 broken. Mark: 9eb3d
```

For asynchronous test and more examples [click here](http://zhanzhenzhen.github.io/wishlist/).

# Tutorial

[Click here for the tutorial.](http://zhanzhenzhen.github.io/wishlist/)

# Contributing

See "CONTRIBUTING.md".
