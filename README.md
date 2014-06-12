# Wishlist

Super natural testing framework.

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

# Tutorial

[Click here for the tutorial.](http://zhanzhenzhen.github.io/wishlist/)

# Contributing

See "CONTRIBUTING.md".
