import { Component } from '@angular/core';

import { CacheService } from '../../providers/index';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private _cache: CacheService) {

  }

  ngOnInit () {
	// Prepare data to going cached
    let promise: Promise<any>;
    let key: Int32Array | string;

	key = this._cache.getKey('promise1');
	promise = new Promise((resolve, reject) => {
	  resolve({
	    'promise1': 'this is the first promise'
	  });
	});

	if (this._cache.cacheExists(key)) {
	   this._cache.getCache(key).then(
	      (data) => {
	        console.log(data);
	        console.log('cache with key: '+ key +' exists');
	      })
	} else {
	    // Save a Promise on the cache Provider
	    this._cache.setCache (key, promise);
	    console.log('cache with key: '+ key +' saved')
	}
  }
}
