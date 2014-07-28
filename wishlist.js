// Generated by CoffeeScript 1.7.1

/* @preserve
Wishlist
https://github.com/zhanzhenzhen/wishlist
(c) 2014 Zhenzhen Zhan
Wishlist may be freely distributed under the MIT license.
 */

(function() {
  var npmWishlist,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  npmWishlist = {};

  npmWishlist.environmentType = (typeof exports !== "undefined" && exports !== null) && ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) && ((typeof process !== "undefined" && process !== null ? process.execPath : void 0) != null) && typeof process.execPath === "string" && process.execPath.search(/node/i) !== -1 ? "node" : (typeof window !== "undefined" && window !== null) && (typeof navigator !== "undefined" && navigator !== null) && (typeof HTMLElement !== "undefined" && HTMLElement !== null) ? "browser" : void 0;

  npmWishlist.moduleSystem = (typeof exports !== "undefined" && exports !== null) && ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) ? "commonjs" : null;

  npmWishlist.objectIs = function(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      if (a === 0 && b === 0) {
        return 1 / a === 1 / b;
      } else if (isNaN(a) && isNaN(b)) {
        return true;
      } else {
        return a === b;
      }
    } else {
      return a === b;
    }
  };

  npmWishlist.objectClone = function(x) {
    var key, y, _i, _len, _ref;
    y = {};
    _ref = Object.keys(x);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      y[key] = x[key];
    }
    return y;
  };

  npmWishlist.valueToMessage = function(value) {
    var internal, r;
    internal = function(value, maxLevel) {
      if (value === void 0) {
        return "undefined";
      } else if (value === null) {
        return "null";
      } else if (Array.isArray(value)) {
        if (maxLevel > 0) {
          return "[" + value.map(function(m) {
            return internal(m, maxLevel - 1);
          }).join(",") + "]";
        } else {
          return "[Array]";
        }
      } else if (typeof value === "function") {
        return "[Function]";
      } else if (typeof value === "object") {
        if (maxLevel > 0) {
          return "{" + Object.keys(value).map(function(m) {
            return ("" + (JSON.stringify(m)) + ":") + internal(value[m], maxLevel - 1);
          }).join(",") + "}";
        } else {
          return "[Object]";
        }
      } else if (typeof value === "string") {
        return JSON.stringify(value.toString());
      } else if (typeof value === "number") {
        if (npmWishlist.objectIs(value, -0)) {
          return "-0";
        } else {
          return value.toString();
        }
      } else {
        return value.toString();
      }
    };
    r = internal(value, 3);
    if (r.length > 1000) {
      r = internal(value, 2);
    }
    if (r.length > 1000) {
      r = internal(value, 1);
    }
    if (r.length > 1000) {
      r = internal(value, 0);
    }
    return r;
  };

  npmWishlist.currentRootTest = null;

  npmWishlist.parseExpression = function(expStr, envNames) {
    var c, dotAffected, i, objectKeyReady, oldDotAffected, oldObjectKeyReady, oldSlashQuoteReady, oldWordStarted, positions, quote, regex, s, slashQuoteReady, wordStarted;
    expStr += " ";
    if (envNames.length === 0) {
      return [];
    }
    regex = new RegExp("^(" + envNames.join("|") + ")[^a-zA-Z0-9_$]", "g");
    positions = [];
    quote = null;
    slashQuoteReady = true;
    wordStarted = false;
    dotAffected = false;
    objectKeyReady = false;
    i = 0;
    while (i < expStr.length - 1) {
      c = expStr[i];
      oldSlashQuoteReady = slashQuoteReady;
      if (quote === null) {
        if (("a" <= c && c <= "z") || ("A" <= c && c <= "Z") || ("0" <= c && c <= "9") || c === "_" || c === "$" || c === ")" || c === "]") {
          slashQuoteReady = false;
        } else if (c === " " || c === "\t" || c === "\n" || c === "\r") {

        } else {
          slashQuoteReady = true;
        }
      }
      oldWordStarted = wordStarted;
      if (quote === null) {
        if (("a" <= c && c <= "z") || ("A" <= c && c <= "Z") || ("0" <= c && c <= "9") || c === "_" || c === "$" || c === ".") {
          wordStarted = true;
        } else {
          wordStarted = false;
        }
      }
      oldDotAffected = dotAffected;
      if (quote === null) {
        if (c === ".") {
          dotAffected = true;
        } else if (c === " " || c === "\t" || c === "\n" || c === "\r") {

        } else {
          dotAffected = false;
        }
      }
      oldObjectKeyReady = objectKeyReady;
      if (quote === null) {
        if (c === "{" || c === ",") {
          objectKeyReady = true;
        } else if (c === " " || c === "\t" || c === "\n" || c === "\r") {

        } else {
          objectKeyReady = false;
        }
      }
      if (c === "\"" && quote === null) {
        quote = "double";
        i++;
      } else if (c === "'" && quote === null) {
        quote = "single";
        i++;
      } else if (c === "/" && quote === null && oldSlashQuoteReady) {
        quote = "slash";
        i++;
      } else if ((c === "\"" && quote === "double") || (c === "'" && quote === "single") || (c === "/" && quote === "slash")) {
        quote = null;
        i++;
      } else if (c === "\\" && quote !== null) {
        i += 2;
      } else if (quote === null && !oldWordStarted && !oldDotAffected && (("a" <= c && c <= "z") || ("A" <= c && c <= "Z"))) {
        s = expStr.substr(i, 31);
        if (!(oldObjectKeyReady && s.search(/^([a-zA-Z0-9_$])+\s*:/) !== -1) && s.search(regex) !== -1) {
          positions.push(i);
        }
        i++;
      } else {
        i++;
      }
    }
    return positions;
  };

  npmWishlist.parseWish = function(wishStr) {
    var description, parsed;
    parsed = null;
    description = null;
    [0, 1].forEach(function(round) {
      var brace, bracket, c, dotAffected, i, match, oldDotAffected, oldSlashQuoteReady, parenthesis, quote, s, slashQuoteReady;
      quote = null;
      parenthesis = 0;
      bracket = 0;
      brace = 0;
      slashQuoteReady = true;
      dotAffected = false;
      i = 0;
      while (i < wishStr.length) {
        c = wishStr[i];
        oldSlashQuoteReady = slashQuoteReady;
        if (quote === null) {
          if (("a" <= c && c <= "z") || ("A" <= c && c <= "Z") || ("0" <= c && c <= "9") || c === "_" || c === "$" || c === ")" || c === "]") {
            slashQuoteReady = false;
          } else if (c === " " || c === "\t" || c === "\n" || c === "\r") {

          } else {
            slashQuoteReady = true;
          }
        }
        oldDotAffected = dotAffected;
        if (quote === null) {
          if (c === ".") {
            dotAffected = true;
          } else if (c === " " || c === "\t" || c === "\n" || c === "\r") {

          } else {
            dotAffected = false;
          }
        }
        if (c === "\"" && quote === null) {
          quote = "double";
          i++;
        } else if (c === "'" && quote === null) {
          quote = "single";
          i++;
        } else if (c === "/" && quote === null && oldSlashQuoteReady) {
          quote = "slash";
          i++;
        } else if ((c === "\"" && quote === "double") || (c === "'" && quote === "single") || (c === "/" && quote === "slash")) {
          quote = null;
          i++;
        } else if (c === "\\" && quote !== null) {
          i += 2;
        } else if (c === "(") {
          parenthesis++;
          i++;
        } else if (c === "[") {
          bracket++;
          i++;
        } else if (c === "{") {
          brace++;
          i++;
        } else if (c === ")") {
          parenthesis--;
          i++;
        } else if (c === "]") {
          bracket--;
          i++;
        } else if (c === "}") {
          brace--;
          i++;
        } else if (quote === null && !oldDotAffected && ((parenthesis === bracket && bracket === brace) && brace === 0)) {
          if (round === 0) {
            if (c === ":") {
              description = wishStr.substr(i + 1);
              wishStr = wishStr.substr(0, i);
              break;
            }
          } else if (round === 1) {
            s = wishStr.substr(i);
            if ((match = s.match(/^=([^]+)$/)) != null) {
              parsed = {
                type: "equal",
                components: [wishStr.substr(0, i), match[1]]
              };
              break;
            } else if ((match = s.match(/^<>([^]+)$/)) != null) {
              parsed = {
                type: "notEqual",
                components: [wishStr.substr(0, i), match[1]]
              };
              break;
            } else if ((match = s.match(/^\sis\s([^]+)$/)) != null) {
              parsed = {
                type: "is",
                components: [wishStr.substr(0, i), match[1]]
              };
              break;
            } else if ((match = s.match(/^\sisnt\s([^]+)$/)) != null) {
              parsed = {
                type: "isnt",
                components: [wishStr.substr(0, i), match[1]]
              };
              break;
            } else if ((match = s.match(/^\sthrows(?:\s([^]+))?$/)) != null) {
              parsed = {
                type: "throws",
                components: [wishStr.substr(0, i), match[1] != null ? match[1] : "undefined"]
              };
              break;
            } else if ((match = s.match(/^<=([^]+)$/)) != null) {
              parsed = {
                type: "lessThanOrEqual",
                components: [wishStr.substr(0, i), match[1]]
              };
              break;
            } else if ((match = s.match(/^>=([^]+)$/)) != null) {
              parsed = {
                type: "greaterThanOrEqual",
                components: [wishStr.substr(0, i), match[1]]
              };
              break;
            } else if ((match = s.match(/^<([^]+)$/)) != null) {
              parsed = {
                type: "lessThan",
                components: [wishStr.substr(0, i), match[1]]
              };
              break;
            } else if ((match = s.match(/^>([^]+)$/)) != null) {
              parsed = {
                type: "greaterThan",
                components: [wishStr.substr(0, i), match[1]]
              };
              break;
            }
          }
          i++;
        } else {
          i++;
        }
      }
      if (round === 1) {
        return parsed != null ? parsed : parsed = {
          type: "doesNotThrow",
          components: [wishStr]
        };
      }
    });
    parsed.components.push(JSON.stringify((description != null ? description : wishStr).trim()));
    return parsed;
  };

  npmWishlist.parseWishes = function(wishlistStr) {
    var brace, bracket, c, i, lastIndex, oldSlashQuoteReady, parenthesis, positions, quote, r, s, slashQuoteReady;
    quote = null;
    parenthesis = 0;
    bracket = 0;
    brace = 0;
    slashQuoteReady = true;
    positions = [];
    i = 0;
    while (i < wishlistStr.length) {
      c = wishlistStr[i];
      oldSlashQuoteReady = slashQuoteReady;
      if (quote === null) {
        if (("a" <= c && c <= "z") || ("A" <= c && c <= "Z") || ("0" <= c && c <= "9") || c === "_" || c === "$" || c === ")" || c === "]") {
          slashQuoteReady = false;
        } else if (c === " " || c === "\t" || c === "\n" || c === "\r") {

        } else {
          slashQuoteReady = true;
        }
      }
      if (c === "\"" && quote === null) {
        quote = "double";
        i++;
      } else if (c === "'" && quote === null) {
        quote = "single";
        i++;
      } else if (c === "/" && quote === null && oldSlashQuoteReady) {
        quote = "slash";
        i++;
      } else if ((c === "\"" && quote === "double") || (c === "'" && quote === "single") || (c === "/" && quote === "slash")) {
        quote = null;
        i++;
      } else if (c === "\\" && quote !== null) {
        i += 2;
      } else if (c === "(") {
        parenthesis++;
        i++;
      } else if (c === "[") {
        bracket++;
        i++;
      } else if (c === "{") {
        brace++;
        i++;
      } else if (c === ")") {
        parenthesis--;
        i++;
      } else if (c === "]") {
        bracket--;
        i++;
      } else if (c === "}") {
        brace--;
        i++;
      } else if (quote === null && ((parenthesis === bracket && bracket === brace) && brace === 0) && c === ";") {
        positions.push(i);
        i++;
      } else {
        i++;
      }
    }
    r = [];
    lastIndex = -1;
    positions.forEach(function(index) {
      var s;
      s = wishlistStr.substring(lastIndex + 1, index).trim();
      if (s !== "") {
        r.push(s);
      }
      return lastIndex = index;
    });
    s = wishlistStr.substr(lastIndex + 1).trim();
    if (s !== "") {
      r.push(s);
    }
    return r;
  };

  npmWishlist.sha256 = function(str) {
    var Ch, H, K, M, Maj, N, ROTR, SHR, SIGMA0, SIGMA1, T1, T2, W, a, add, b, bytes, c, d, e, f, g, h, i, j, k, l, offset, paddedLength, sigma0, sigma1, t, wordToString, _i, _j, _k, _l, _m, _n, _ref;
    if (str.length > Math.round(Math.pow(2, 31) - 1)) {
      throw new Error();
    }
    wordToString = function(n) {
      var i;
      return ((function() {
        var _i, _results;
        _results = [];
        for (i = _i = 7; _i >= 0; i = --_i) {
          _results.push(((n >>> (i * 4)) % 16).toString(16));
        }
        return _results;
      })()).join("");
    };
    add = function() {
      var arg, r, _i, _len;
      r = 0;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        arg = arguments[_i];
        r = (r + arg) % 0x100000000;
      }
      return r;
    };
    ROTR = function(x, n) {
      return x >>> n | x << (32 - n);
    };
    SHR = function(x, n) {
      return x >>> n;
    };
    Ch = function(x, y, z) {
      return (x & y) ^ (~x & z);
    };
    Maj = function(x, y, z) {
      return (x & y) ^ (x & z) ^ (y & z);
    };
    SIGMA0 = function(x) {
      return ROTR(x, 2) ^ ROTR(x, 13) ^ ROTR(x, 22);
    };
    SIGMA1 = function(x) {
      return ROTR(x, 6) ^ ROTR(x, 11) ^ ROTR(x, 25);
    };
    sigma0 = function(x) {
      return ROTR(x, 7) ^ ROTR(x, 18) ^ SHR(x, 3);
    };
    sigma1 = function(x) {
      return ROTR(x, 17) ^ ROTR(x, 19) ^ SHR(x, 10);
    };
    K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    bytes = str.split("").map(function(m) {
      return m.charCodeAt(0);
    });
    l = str.length * 8;
    k = 448 - l - 1;
    while (k < 0) {
      k += 512;
    }
    paddedLength = l + 1 + k + 64;
    bytes.push(0x80);
    for (i = _i = 0, _ref = Math.round((k - 7) / 8); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      bytes.push(0);
    }
    bytes.push(0);
    bytes.push(0);
    bytes.push(0);
    bytes.push(0);
    bytes.push(l >>> 24);
    bytes.push((l >>> 16) % 256);
    bytes.push((l >>> 8) % 256);
    bytes.push(l % 256);
    N = Math.round(paddedLength / 512);
    M = new Array(N);
    for (i = _j = 0; 0 <= N ? _j < N : _j > N; i = 0 <= N ? ++_j : --_j) {
      M[i] = new Array(16);
      for (j = _k = 0; _k < 16; j = ++_k) {
        offset = i * 64 + j * 4;
        M[i][j] = (bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3];
      }
    }
    W = new Array(64);
    for (i = _l = 0; 0 <= N ? _l < N : _l > N; i = 0 <= N ? ++_l : --_l) {
      for (t = _m = 0; _m < 64; t = ++_m) {
        W[t] = t < 16 ? M[i][t] : add(sigma1(W[t - 2]), W[t - 7], sigma0(W[t - 15]), W[t - 16]);
      }
      a = H[0];
      b = H[1];
      c = H[2];
      d = H[3];
      e = H[4];
      f = H[5];
      g = H[6];
      h = H[7];
      for (t = _n = 0; _n < 64; t = ++_n) {
        T1 = add(h, SIGMA1(e), Ch(e, f, g), K[t], W[t]);
        T2 = add(SIGMA0(a), Maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = add(d, T1);
        d = c;
        c = b;
        b = a;
        a = add(T1, T2);
      }
      H[0] = add(a, H[0]);
      H[1] = add(b, H[1]);
      H[2] = add(c, H[2]);
      H[3] = add(d, H[3]);
      H[4] = add(e, H[4]);
      H[5] = add(f, H[5]);
      H[6] = add(g, H[6]);
      H[7] = add(h, H[7]);
    }
    return H.map(function(m) {
      return wordToString(m);
    }).join("");
  };


  /*
  In `npmWishlist.Test`, the `wishes` property contains only separated wishes
  (i.e. not including those defined and checked in a test function), but
  the `wishResults` property includes results for all wishes.
   */

  npmWishlist.Test = (function() {
    function Test(description) {
      this.description = description != null ? description : "";
      this._children = [];
      this.fun = (function(_this) {
        return function() {};
      })(this);
      this.wishes = [];
      this.async = false;
      this.parent = null;
      this._resetContext();
    }

    Test.prototype._resetContext = function() {
      this.env = {};
      this.wishResults = [];
      return this.result = null;
    };

    Test.prototype.set = function() {
      var description, fun, normalizeWishes, options, rawWishes, wishes;
      description = fun = wishes = rawWishes = options = void 0;
      normalizeWishes = (function(_this) {
        return function(raw) {
          var combined;
          combined = Array.isArray(raw) ? raw.join(";") : typeof raw === "string" ? raw : "";
          return npmWishlist.parseWishes(combined);
        };
      })(this);
      if (typeof arguments[0] === "string") {
        description = arguments[0];
        fun = arguments[1];
        if (typeof arguments[2] === "object" && arguments[2] !== null && !Array.isArray(arguments[2])) {
          options = arguments[2];
        } else {
          rawWishes = arguments[2];
          options = arguments[3];
        }
      } else {
        fun = arguments[0];
        if (typeof arguments[1] === "object" && arguments[1] !== null && !Array.isArray(arguments[1])) {
          options = arguments[1];
        } else {
          rawWishes = arguments[1];
          options = arguments[2];
        }
      }
      wishes = normalizeWishes(rawWishes);
      if (options == null) {
        options = {};
      }
      if (description !== void 0) {
        this.description = description;
      }
      this.fun = fun;
      if (rawWishes !== void 0) {
        this.wishes = wishes;
      }
      if (options.async !== void 0) {
        this.async = options.async;
      }
      return this;
    };

    Test.prototype.setAsync = function() {
      var args, lastArg, m, _i, _len;
      args = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        m = arguments[_i];
        args.push(m);
      }
      lastArg = args[args.length - 1];
      if (typeof lastArg === "object" && lastArg !== null && !Array.isArray(lastArg)) {
        lastArg.async = true;
      } else {
        args.push({
          async: true
        });
      }
      return this.set.apply(this, args);
    };

    Test.prototype.add = function() {
      var newChild;
      newChild = null;
      if (arguments[0] instanceof npmWishlist.Test) {
        newChild = arguments[0];
      } else {
        newChild = new npmWishlist.Test();
        newChild.set.apply(newChild, arguments);
      }
      newChild.parent = this;
      this._children.push(newChild);
      return this;
    };

    Test.prototype.addAsync = function() {
      var args, lastArg, m, _i, _len;
      args = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        m = arguments[_i];
        args.push(m);
      }
      lastArg = args[args.length - 1];
      if (typeof lastArg === "object" && lastArg !== null && !Array.isArray(lastArg)) {
        lastArg.async = true;
      } else {
        args.push({
          async: true
        });
      }
      return this.add.apply(this, args);
    };

    Test.prototype.getChildren = function() {
      return this._children.slice(0);
    };

    Test.prototype.getAncestors = function() {
      var r, test;
      test = this;
      r = [];
      while (test.parent !== null) {
        r.push(test.parent);
        test = test.parent;
      }
      return r;
    };

    Test.prototype.run = function(isRoot) {
      var allTests, timer, timerJob, traverse;
      if (isRoot == null) {
        isRoot = true;
      }
      if (isRoot) {
        npmWishlist.currentRootTest = this;
      }
      this._resetContext();
      if (this.parent != null) {
        this.env = npmWishlist.objectClone(this.parent.env);
      }
      setTimeout((function(_this) {
        return function() {
          var domain;
          if (npmWishlist.environmentType === "node") {
            domain = module.require("domain").create();
            domain.on("error", function(error) {
              return _this.end({
                type: false,
                errorMessage: "Error Name: " + error.name + "\nError Message: " + error.message + "\nError Stack: " + error.stack
              });
            });
            domain.run(function() {
              return _this.fun(_this.env, _this);
            });
          } else {
            try {
              _this.fun(_this.env, _this);
            } catch (_error) {
              _this.end({
                type: false
              });
            }
          }
          if ((_this.result == null) && !_this.async) {
            return _this.end({
              type: true
            });
          }
        };
      })(this), 0);
      if (isRoot) {
        allTests = [];
        allTests.push(this);
        traverse = (function(_this) {
          return function(test) {
            return test.getChildren().forEach(function(m) {
              allTests.push(m);
              return traverse(m);
            });
          };
        })(this);
        traverse(this);
        console.log();
        timerJob = (function(_this) {
          return function() {
            var exceptionTests, failureCount, mark, markString, okTests, pendingTests, successCount;
            okTests = allTests.filter(function(m) {
              return (m.result != null) && m.result.type === true;
            });
            exceptionTests = allTests.filter(function(m) {
              return (m.result != null) && m.result.type === false;
            });
            pendingTests = allTests.filter(function(m) {
              return m.result == null;
            });
            console.log(("" + (new Date().toISOString()) + " OK: " + okTests.length + ", ") + ("Exception: " + exceptionTests.length + ", Pending: " + pendingTests.length));
            if (pendingTests.length === 0) {
              clearInterval(timer);
              exceptionTests.forEach(function(m) {
                console.log("\n********** Exceptional Test **********");
                console.log("Test: " + m.description);
                console.log("Function: " + (m.fun.toString()));
                if (m.result.errorMessage != null) {
                  return console.log(m.result.errorMessage);
                }
              });
              failureCount = 0;
              successCount = 0;
              markString = "";
              allTests.forEach(function(m) {
                return m.wishResults.forEach(function(n) {
                  var ancestors, longDescription;
                  markString += " " + n.type.toString();
                  if (n.type === false) {
                    failureCount++;
                    ancestors = m.getAncestors();
                    ancestors.reverse();
                    longDescription = ancestors.concat([m]).map(function(m) {
                      return m.description;
                    }).join(" --> ");
                    console.log("\n********** Broken Wish **********");
                    console.log("    Test: " + longDescription);
                    console.log("    Wish: " + n.description);
                    console.log("Expected: " + n.expected);
                    return console.log("  Actual: " + n.actual);
                  } else {
                    return successCount++;
                  }
                });
              });
              markString = markString.trim();
              mark = npmWishlist.sha256(markString).substr(0, 5);
              console.log("\n" + ((exceptionTests.length === 0 ? "Tests OK." : "" + exceptionTests.length + " tests of " + allTests.length + " exceptional.") + " " + (failureCount === 0 ? "Wishes fulfilled." : "" + failureCount + " wishes of " + (failureCount + successCount) + " broken.") + " " + ("Mark: " + mark)) + "\n");
              _this.allEnded = true;
              return npmWishlist.currentRootTest = null;
            }
          };
        })(this);
        timer = setInterval(timerJob, 1000);
        setTimeout(timerJob, 10);
      }
      return this;
    };

    Test.prototype.end = function(result) {
      if (this.result == null) {
        this.result = result != null ? result : {
          type: true
        };
        this.wishes.forEach((function(_this) {
          return function(m) {
            return _this._checkWish(m);
          };
        })(this));
        this.getChildren().forEach((function(_this) {
          return function(m) {
            return m.run(false);
          };
        })(this));
      }
      return this;
    };

    Test.prototype._checkWish = function(wishStr) {
      var args, description, interpret, parsed, result, that;
      that = this;
      interpret = (function(_this) {
        return function(s) {
          npmWishlist.parseExpression(s, Object.keys(_this.env)).forEach(function(m, index) {
            var insertedString, pos;
            insertedString = "that.env.";
            pos = m + insertedString.length * index;
            return s = s.substr(0, pos) + insertedString + s.substr(pos);
          });
          return s;
        };
      })(this);
      parsed = npmWishlist.parseWish(wishStr);
      args = parsed.components.map((function(_this) {
        return function(m, index) {
          if (index === parsed.components.length - 1) {
            return m;
          } else {
            return interpret(m);
          }
        };
      })(this));
      description = JSON.parse(args[args.length - 1]);
      result = (function() {
        try {
          args = args.map((function(_this) {
            return function(m) {
              return eval("((" + m + "))");
            };
          })(this));
          return this["_check_" + parsed.type].apply(this, args);
        } catch (_error) {
          return {
            type: false,
            description: description,
            actual: "unknown",
            expected: "unknown"
          };
        }
      }).call(this);
      return this.wishResults.push(result);
    };

    Test.prototype.wish = function(wishlistStr) {
      return npmWishlist.parseWishes(wishlistStr).forEach((function(_this) {
        return function(wishStr) {
          return _this._checkWish(wishStr);
        };
      })(this));
    };

    return Test;

  })();

  npmWishlist.Test.prototype._check_equal = function(actual, ruler, description) {
    var determine, objects, result;
    if (description == null) {
      description = "";
    }
    objects = [];
    determine = (function(_this) {
      return function(actual, ruler) {
        if (Array.isArray(actual) && Array.isArray(ruler)) {
          if (ruler.every(function(m, index) {
            if (__indexOf.call(objects, m) >= 0) {
              return npmWishlist.objectIs(actual[index], m);
            } else {
              if (typeof m === "object" && m !== null) {
                objects.push(m);
              }
              return determine(actual[index], m);
            }
          })) {
            return true;
          } else {
            return false;
          }
        } else if (typeof actual === "object" && actual !== null && typeof ruler === "object" && ruler !== null) {
          if (Object.keys(ruler).every(function(m) {
            var _ref;
            if (_ref = ruler[m], __indexOf.call(objects, _ref) >= 0) {
              return npmWishlist.objectIs(actual[m], ruler[m]);
            } else {
              if (typeof ruler[m] === "object" && ruler[m] !== null) {
                objects.push(ruler[m]);
              }
              return determine(actual[m], ruler[m]);
            }
          })) {
            return true;
          } else {
            return false;
          }
        } else {
          return npmWishlist.objectIs(actual, ruler);
        }
      };
    })(this);
    result = {
      type: determine(actual, ruler),
      description: description
    };
    if (result.type === false) {
      result.actual = npmWishlist.valueToMessage(actual);
      result.expected = "= " + npmWishlist.valueToMessage(ruler);
    }
    return result;
  };

  npmWishlist.Test.prototype._check_notEqual = function(actual, ruler, description) {
    var determine, objects, result;
    if (description == null) {
      description = "";
    }
    objects = [];
    determine = (function(_this) {
      return function(actual, ruler) {
        if (Array.isArray(actual) && Array.isArray(ruler)) {
          if (ruler.some(function(m, index) {
            if (__indexOf.call(objects, m) >= 0) {
              return !npmWishlist.objectIs(actual[index], m);
            } else {
              if (typeof m === "object" && m !== null) {
                objects.push(m);
              }
              return determine(actual[index], m);
            }
          })) {
            return true;
          } else {
            return false;
          }
        } else if (typeof actual === "object" && actual !== null && typeof ruler === "object" && ruler !== null) {
          if (Object.keys(ruler).some(function(m) {
            var _ref;
            if (_ref = ruler[m], __indexOf.call(objects, _ref) >= 0) {
              return !npmWishlist.objectIs(actual[m], ruler[m]);
            } else {
              if (typeof ruler[m] === "object" && ruler[m] !== null) {
                objects.push(ruler[m]);
              }
              return determine(actual[m], ruler[m]);
            }
          })) {
            return true;
          } else {
            return false;
          }
        } else {
          return !npmWishlist.objectIs(actual, ruler);
        }
      };
    })(this);
    result = {
      type: determine(actual, ruler),
      description: description
    };
    if (result.type === false) {
      result.actual = npmWishlist.valueToMessage(actual);
      result.expected = "≠ " + npmWishlist.valueToMessage(ruler);
    }
    return result;
  };

  npmWishlist.Test.prototype._check_is = function(actual, ruler, description) {
    var result;
    if (description == null) {
      description = "";
    }
    result = {
      type: npmWishlist.objectIs(actual, ruler),
      description: description
    };
    if (result.type === false) {
      result.actual = npmWishlist.valueToMessage(actual);
      result.expected = "is " + npmWishlist.valueToMessage(ruler);
    }
    return result;
  };

  npmWishlist.Test.prototype._check_isnt = function(actual, ruler, description) {
    var result;
    if (description == null) {
      description = "";
    }
    result = {
      type: !npmWishlist.objectIs(actual, ruler),
      description: description
    };
    if (result.type === false) {
      result.actual = npmWishlist.valueToMessage(actual);
      result.expected = "isn't " + npmWishlist.valueToMessage(ruler);
    }
    return result;
  };

  npmWishlist.Test.prototype._check_throws = function(fun, ruler, description) {
    var error, passed, result, resultType;
    if (description == null) {
      description = "";
    }
    passed = false;
    resultType = (function() {
      try {
        fun();
        passed = true;
        return false;
      } catch (_error) {
        error = _error;
        if (ruler == null) {
          return true;
        } else if (ruler instanceof RegExp) {
          if (ruler.test(error.message)) {
            return true;
          } else {
            return false;
          }
        } else {
          if (error instanceof ruler) {
            return true;
          } else {
            return false;
          }
        }
      }
    })();
    result = {
      type: resultType,
      description: description
    };
    if (result.type === false) {
      result.actual = passed ? "no exception" : "another exception";
      result.expected = passed ? "exception" : "an exception";
    }
    return result;
  };

  npmWishlist.Test.prototype._check_doesNotThrow = function(fun, description) {
    var result, resultType;
    if (description == null) {
      description = "";
    }
    resultType = (function() {
      try {
        fun();
        return true;
      } catch (_error) {
        return false;
      }
    })();
    result = {
      type: resultType,
      description: description
    };
    if (result.type === false) {
      result.actual = "exception";
      result.expected = "no exception";
    }
    return result;
  };

  npmWishlist.Test.prototype._check_lessThan = function(actual, ruler, description) {
    var result;
    if (description == null) {
      description = "";
    }
    result = {
      type: actual < ruler,
      description: description
    };
    if (result.type === false) {
      result.actual = npmWishlist.valueToMessage(actual);
      result.expected = "< " + npmWishlist.valueToMessage(ruler);
    }
    return result;
  };

  npmWishlist.Test.prototype._check_lessThanOrEqual = function(actual, ruler, description) {
    var result;
    if (description == null) {
      description = "";
    }
    result = {
      type: actual <= ruler,
      description: description
    };
    if (result.type === false) {
      result.actual = npmWishlist.valueToMessage(actual);
      result.expected = "<= " + npmWishlist.valueToMessage(ruler);
    }
    return result;
  };

  npmWishlist.Test.prototype._check_greaterThan = function(actual, ruler, description) {
    var result;
    if (description == null) {
      description = "";
    }
    result = {
      type: actual > ruler,
      description: description
    };
    if (result.type === false) {
      result.actual = npmWishlist.valueToMessage(actual);
      result.expected = "> " + npmWishlist.valueToMessage(ruler);
    }
    return result;
  };

  npmWishlist.Test.prototype._check_greaterThanOrEqual = function(actual, ruler, description) {
    var result;
    if (description == null) {
      description = "";
    }
    result = {
      type: actual >= ruler,
      description: description
    };
    if (result.type === false) {
      result.actual = npmWishlist.valueToMessage(actual);
      result.expected = ">= " + npmWishlist.valueToMessage(ruler);
    }
    return result;
  };

  if (npmWishlist.environmentType === "browser") {
    window.npmWishlist = npmWishlist;
  }

  if (npmWishlist.moduleSystem === "commonjs") {
    module.exports = npmWishlist;
  }

  npmWishlist.packageInfo = {
    "name": "wishlist",
    "version": "0.2.6",
    "description": "Super natural testing framework.",
    "keywords": ["test", "testing", "async", "unit", "bdd", "tdd", "asynchronous", "assertion", "assert", "mocha", "qunit", "karma", "jasmine", "vows", "qunitjs", "chai"],
    "author": "Zhenzhen Zhan <zhanzhenzhen@hotmail.com>",
    "homepage": "http://zhanzhenzhen.github.io/wishlist/",
    "licenses": [
      {
        "type": "MIT",
        "url": "https://github.com/zhanzhenzhen/wishlist/blob/master/LICENSE.txt"
      }
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/zhanzhenzhen/wishlist.git"
    },
    "devDependencies": {
      "coffee-script": "1.7.1",
      "uglify-js": "2.4.13"
    },
    "main": "wishlist"
  };

}).call(this);