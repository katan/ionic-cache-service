import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { CacheService } from '../../providers/index';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _cache: CacheService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    // Prepare data to going cached
    let promise: Promise<any>;
    let key: Int32Array | string;

    key = this._cache.getKey('promise2');
    promise = new Promise((resolve, reject) => {
        resolve(['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane','american-football', 'boat', 'bluetooth', 'build']);
      });

    if (this._cache.exists(key)) {
      this.generateItems(this._cache.get(key));
      console.log('cache with key: '+ key +' exists');
    } else {
        // Save a Promise on the cache Provider
        this._cache.set(key, promise).then(
          (index) => {
            this.generateItems(promise);
            console.log('cache with key: '+ key +' saved');
          });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  generateItems (dataPromise: Promise<any>) {
    dataPromise.then(
      (data) => {
        this.icons = data;
        this.items = [];

        for(let i = 1; i < 11; i++) {
          this.items.push({
            title: 'Item ' + i,
            note: 'This is item #' + i,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)]
          });
        }
      });
  }
}
