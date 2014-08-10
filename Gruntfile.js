/*
 * grunt-contrib-sass
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

(function(){})(),module.exports=function(e){e.initConfig({pkg:e.file.readJSON("package.json"),sass:{dist:{files:{"app/css/style.css":"app/sass/style.scss"}}},jshint:{all:{src:["Gruntfile.js","app/js/**/*.js","app/main.js"]}},watch:{css:{files:"**/*.scss",tasks:["sass"]},jshint:{files:["Gruntfile.js","app/js/**/*.js","app/main.js"],task:["jshint"]}}}),e.loadNpmTasks("grunt-contrib-sass"),e.loadNpmTasks("grunt-contrib-watch"),e.loadNpmTasks("grunt-contrib-jshint"),e.registerTask("default",["watch","jshint"])};