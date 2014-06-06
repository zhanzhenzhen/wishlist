if npmWishes.environmentType == "browser"
    window.npmWishes = npmWishes
else if npmWishes.environmentType == "node"
    module.exports = npmWishes
else
    throw new Error()
