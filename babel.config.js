module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ],
    [
      'prismjs', 
      {
        'languages': ['javascript', 'css', 'markup', 'python', 'html', 'java', 'c', 'cpp', 'cmake', 'git'],
        'plugins': ['line-numbers'],
        'theme': 'okaidia',
        'css': true
      }
    ]
  ]
}
