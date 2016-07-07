// import {Component} from '@angular/core';
// import {Http, Response} from '@angular/http'
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {HTTP_PROVIDERS} from '@angular/http';


@Injectable()
export class HTTPTestService {
    private headers: Headers;
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    getcurrentTime() {
        return this.http.get('http://date.jsontest.com')
            .map(res => res.json())
            .catch(this.handleError);
    }
    testfoursquare() {
        var url = "https://api.foursquare.com/v2/venues/search?v=20130815&&";
        var query = "&query=sushi";
        var near = "&near=Vienna,AT";
        var client_id = '&client_id=DATGSLTPSJN2AUSVTGOK12NIGHPOTDD4Z1SEZ0XLPN0DOPBU';
        var client_secret = '&client_secret=1YQUJF4STX2FTU4HMDDA5IFZEJSNSJB35RBTGP3SKKR0M4RL';
        var requrl = url + query + near + client_id + client_secret;
        return this.http.get(requrl)
            .map(res => res.json())
            .catch(this.handleError);
    }
    testFirebase() {
        var requrl = "https://flickering-inferno-6917.firebaseio.com/events.json";
        return this.http.get(requrl)
            .map(res => res.json())
            .catch(this.handleError);
    }
    addtoFirebase() {
        var toAdd = JSON.stringify({ title: 'ng2Test' });
        return this.http.post("https://flickering-inferno-6917.firebaseio.com/events.json",
        toAdd, { headers: this.headers }).map(res => res.json());
    }
    getPhotoURL(id) {
        var photourl = 'https://api.foursquare.com/v2/venues/' + id + '/photos?&&';
        var client_id = 'client_id=DATGSLTPSJN2AUSVTGOK12NIGHPOTDD4Z1SEZ0XLPN0DOPBU';
        var client_secret = '&client_secret=1YQUJF4STX2FTU4HMDDA5IFZEJSNSJB35RBTGP3SKKR0M4RL';
        var limit = '&limit=1';
        var v = '&v=20130815';
        var requrl = photourl + client_id + client_secret + limit + v;
        console.log(requrl);
        return requrl;
    }
    getImageIDs(ids) {
        console.log('ids', ids);
        var books = null;
        var movies = null;
        var obs: any[];
        obs = [];
        for (var i = 0; i < ids.length; i++) {
            obs.push(this.http.get(this.getPhotoURL(ids[i].id)).map((res: Response) => res.json()));
        }
        return Observable.forkJoin(obs);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


}

