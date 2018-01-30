import { Component, Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Item } from '../item';
import { NgForm }   from '@angular/forms';


@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

	title = 'Demo App of Angular and laravel';

	private headers = new Headers({'Content-Type': 'application/json'});

	private ItemsUrl= 'http://127.0.0.1:8000/api/items'
	allItems: any={}; 

	itemList : Item[] = [];

    constructor(private _http: Http){
    	this.getItems();
    }

    getItems(){
    	//return this.itemList;

    	return this._http.get(this.ItemsUrl, {headers: this.headers})
  		   .map(res => res.json())
    			.subscribe(data=> {
    				this.itemList = data.items;
    			})

    }
    
  	
  	
  	
  	onSubmit(form: NgForm){
  		var item = Item;
  		item = form.value;
  		this.itemList.push(item);

        return this._http.post(this.ItemsUrl, JSON.stringify(form.value), {headers: this.headers})
  		   .map(res => res.json())
    			.subscribe(data=> {
    				console.log(data);
    			})
	  }

	  deleteItem(item){
	  	console.log(item);
	  }

}
