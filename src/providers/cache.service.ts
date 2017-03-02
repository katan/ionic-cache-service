import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Cache Service
 */
@Injectable()
export class CacheService {
	// Properties
	private _cacheMap: string[];
	private _cache: Promise<any>[];

	constructor() {
		try {
			this._cacheMap = []; 	// ["md5: string", "md5: string", ...]
			this._cache = [];		// [Promise, Promise, ...]
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Save the Promise data on the cache
	 * @param  {Int32Array|string}	key 	A unique md5 hash key
	 * @param  {Promise<any>}  		value 	Promise data to save on the cache (Example: A sqlite result)
	 * @return {Promise<any>}        		resolve: return the index where promise has been saved
	 */
	public set (key: Int32Array | string, value: Promise<any>): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				if (!this.exists(key)) {
					// Save key on cache map
					this._cacheMap.push(key.toString());
					// Save promise
					this._cache.push(value);
					resolve(this._cacheMap.length -1);
				} else {
					reject(key + ' cache exists');
				}
			} catch(error) {
				reject(error);
			}
		});
	}

	/**
	 * Get the Promise cached
	 * @param  {Int32Array|string}	key 	A unique md5 hash key
	 * @return {Promise<any>}
	 */
	public get (key: Int32Array | string): Promise<any> {
		try {
			if (this.exists(key)) {
				let index = this._cacheMap.indexOf(key.toString());
				return this._cache[index];
			}
			return Promise.reject('No cache exists for ' + key);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * Remove key and their cache
	 * @param  {Int32Array|string}	key 	A unique md5 hash key
	 * @return {Promise<any>}
	 */
	public remove (key: Int32Array | string): Promise<any>{
		try {
			if (this.exists(key)) {
				let index = this._cacheMap.indexOf(key.toString());
				this._cacheMap.splice(index, 1);
				this._cache.splice(index, 1);
				return Promise.resolve();
			}
			return Promise.reject('No cache exists for ' + key);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * Get a md5 hash key from a string
	 * @param  {string}     value [description]
	 * @return {Int32Array}       [description]
	 */
	public getKey (value: string): Int32Array | string {
		try {
			return Md5.hashStr(value).toString();
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Check if a cache 
	 * @param  {Int32Array | string}      key [description]
	 * @return {boolean}         [description]
	 */
	public exists (key: Int32Array | string): boolean {
		try {
			return this._cacheMap.indexOf(key.toString()) > -1;
		} catch (error) {
			throw new Error(error);
		}
	}
}