/* Avoid: 'error TS2304: Cannot find name <type>' during compilation */
///<reference path="../../typings/index.d.ts"/>
import {AppComponent} from "./app.component";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from '@angular/http';
// import * as d3 from 'd3';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

// import {FirebaseService} from 'ng2-firebase/core';
// Tell TypeScript that Firebase is a global object.
declare var Firebase;

// import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
// import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    HTTP_PROVIDERS,
    CHART_DIRECTIVES
]);
//provide(FirebaseService, {useFactory: () => new FirebaseService(new Firebase('https://flickering-inferno-6917.firebaseio.com/kk'))})