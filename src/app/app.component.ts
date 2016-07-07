import {Component, OnInit} from "@angular/core";
import {RouteConfig, RouterLink, ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.components";
import {HTTPTestService} from './todo/services/httptest.service';
import {DatepickerDemoComponent} from './todo/datapicker';
import {LineChartDemoComponent} from './linechart';
import {PieChartDemoComponent} from './pie-chart-demo';

// import {GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
// import {MyMapsProjectAppComponent } from './todo/components/my-maps-project.component';
import {AlertComponent} from 'ng2-bootstrap';
// import * as D3 from 'd3';
import * as moment from 'moment';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap';
// import {FirebaseService} from 'ng2-firebase/core';


@Component({
    selector: "app",
    template: `<h1>{{message}}</h1>
    <div class="container">

    <pie-chart-demo></pie-chart-demo>

         <button (click)="testService()">get Time</button>{{message}}
         <button (click)="testFoursquareService()">Test GetVenue</button>{{message}}
         <button (click)="testForkJoin()">Test Fork Join</button>{{message}}
        <div *ngFor="let yy of kk">
         Aktuelle Zahl ist {{yy.name}}
        </div>  
        
         <div *ngFor="let event of events">
         Event: {{event.title}}
        </div> 
               
       <alert type="info">ng2-bootstrap hello world!</alert>
        <div *ngFor="let url of images">
            <img src="{{url}}">
        </div>   
          
    <datepicker [(ngModel)]="dt2" [minDate]="minDate" [showWeeks]="true"></datepicker>
    <button (click)="showselectedData()" type="button" class="btn btn-default">Default</button>   
    <button (click)=" testFirebase()   " type="button" class="btn btn-default">Test Firebase</button>
    <button (click)=" testAddtoFirebase()   " type="button" class="btn btn-default">Add to Firebase</button>              
    
    <line-chart-demo></line-chart-demo>
    
    </div>
    `,
    directives: [TaskListComponent, AboutComponent, RouterLink, ROUTER_DIRECTIVES
    , AlertComponent, DatepickerDemoComponent, DATEPICKER_DIRECTIVES, LineChartDemoComponent, PieChartDemoComponent],
    providers: [HTTPTestService]
})
@RouteConfig([
    { path: '/tasks', component: TaskListComponent, as: 'TaskList' },
    { path: '/about', component: AboutComponent, as: 'About' }
])
export class AppComponent {
    public dt2:Date = new Date();
    public minDate:Date = void 0;
    private message: string;
    private kk: any[];
    private events: any[];
    private pictures: any[];
    private images: any[];
    private books: any;
    private movies: any;
    private errorMessage: string;
    private firebase: any;
    // ngOnInit() {
    //     console.log("Application component initialized ...");
    //     this.message = "Peter";
    // }
    constructor(private httpservice: HTTPTestService) {
        //     console.log("Application component initialized ...");
             this.message = "Peter";
             this.events = [];
             //this.testForkJoin();
             this.pictures = [];
             this.images = [];
    }
    showselectedData() {
        console.log('selected date is', this.dt2);
    }
    dosomething() {
        console.log("something");
    }
    testService() {
        this.httpservice.getcurrentTime()
            .subscribe(
            x => this.message = x.time,
            error => this.errorMessage = <any>error);
            // console.log(this.message);
    }
    testAddtoFirebase() {
        var result: string;
        this.httpservice.addtoFirebase().subscribe(
            x => result = x,
            error => this.errorMessage = <any>error);
        console.log('addres', result);
    }
    testFirebase() {
        this.httpservice.testFirebase()
            .subscribe(
            x => this.firebase = x,
            error => this.errorMessage = <any>error);
            //console.log(this.firebase);
            for (var property in this.firebase) {
                if (this.firebase.hasOwnProperty(property)) {
                    // console.log(property,':',this.firebase[property]);
                    this.events.push(this.firebase[property]);
                }
        }
    }
    testFoursquareService() {
        var ids:string[];
        this.httpservice.testfoursquare()
            .subscribe(
            x => this.kk = x.response.venues,
            error => this.errorMessage = <any>error);
            console.log(this.kk);
            for ( var i = 0; i < this.kk.length; i++) {
                //console.log(this.kk[i].id);
                ids.push(this.kk[i].id);
            }
            console.log(this.kk);
    }
    testForkJoin() {
        var x = "4b06ebf1f964a52021f322e3";
        var y = "4b71a819f964a52013542de3";
        this.httpservice.getImageIDs(this.kk)
            .subscribe(
            data => {
            var data2 = <Array<any>>data;
            console.log('len', data2.length);
            for ( var i = 0; i < data2.length; i++) {
                //console.log('check data2', data2[i].response.photos.items[0]);
                this.pictures.push(data2[i].response.photos.items[0]);
                // this.pictures.push(data[1].response.photos.items[0]);
            }
            for ( var i = 0; i < this.pictures.length; i++) {
                var imgsize = "100x100";
                var img = this.pictures[i];
                var url = img.prefix + imgsize + img.suffix;
                this.images.push(url);
            }
            },
            err => console.error(err)
            );
            console.log('images', this.images);
    }
}



