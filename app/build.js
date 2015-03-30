({
    mainConfigFile : "scripts/main.js",
    baseUrl : "scripts",
    dir: "dist",
    removeCombined: true,
    findNestedDependencies: true,
    modules: [{
        name: "main",
        exclude: [
          "infrastructure"
        ]
      },{
        name: "infrastructure"
      }
    ],
    preserveLicenseComments: false
})
