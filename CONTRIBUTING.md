# How to compile

```bash
npm install && awk 'FNR==1{print ""}1' src/*.coffee src/package-start.txt package.json src/package-end.txt | node_modules/coffee-script/bin/coffee -cs > wishlist.js && node_modules/uglify-js/bin/uglifyjs wishlist.js -o wishlist.min.js -m --screw-ie8 --comments && awk 'FNR==1{print ""}1' integration-test/*.coffee | node_modules/coffee-script/bin/coffee -cs > integration-test/compiled.js
```

# How to publish

This section is for the author only, so other contributors can just ignore it.

The compiled .js files should ONLY be included in the tagged commits. To achieve this goal, we put the release version into a new branch and then delete the branch. This approach makes sense because Git's gc does not delete tagged commits, regardless of whether a branch refers to it. Detailed steps:

First, make sure all changes are recorded in master branch. Then, compile. Then:

```bash
git checkout -b release && git add -f wishlist.js wishlist.min.js integration-test/compiled.js
```

Then commit it and tag it and push it and push tags. Then:

```bash
npm publish . && git checkout master && git branch -D release
```
