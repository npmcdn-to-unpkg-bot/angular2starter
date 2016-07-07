(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs',
        'd3': 'lib/d3',
        // 'angular2-google-maps': 'lib/angular2-google-maps/core',
        // 'angular2-google-maps':'https://npmcdn.com/angular2-google-maps@0.12.0',
        '@angular': 'lib/@angular',
        'moment': 'lib/moment',
        'ng2-firebase': 'lib/ng2-firebase',
        'ng2-bootstrap': 'lib/ng2-bootstrap',
        'ng2-charts':'lib/ng2-charts'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        'd3': {main: 'd3.js', defaultExtension: 'js'},
        // 'angular2-google-maps': {
        //     defaultExtension: 'js',
        //     main: 'index.js' // you can also use core.umd.js here, if you want faster loads
        // },
        'ng2-bootstrap': {defaultExtension: "js",main:'ng2-bootstrap.js'},
        'moment': {defaultExtension: "js",main:'moment.js'},
        'ng2-charts':'lib/ng2-charts/node_modules/chart.js/dist/Chart.js',
        'rxjs': {defaultExtension: 'js'}//,
        // 'angular2-google-maps/core': {defaultExtension: 'js', main: 'index.js'}
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);
