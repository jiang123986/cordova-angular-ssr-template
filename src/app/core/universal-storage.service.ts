import { Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';

/**
 * 统一平台存储类，前端渲染与服务端渲染共用存储，目前以cookie为存储方案，这也是最佳方案
 */
@Injectable()
export class UniversalStorageService implements Storage {
    [index: number]: string;
    [key: string]: any;
    length: number;
    cookies: any;

    constructor(private cookieService: CookieService) { }

    clear(): void {
        this.cookieService.removeAll();
    }

    getAll(): any {
        return this.cookieService.getAll();
    }

    getItem(key: string): string {
        return this.cookieService.get(key);
    }
    getItemObject(key: string): any {
        try {
            let result = this.cookieService.get(key);
            return JSON.parse(result);
        } catch (error) {
            return null;
        }

    }

    key(index: number): string {
        return this.cookieService.getAll().propertyIsEnumerable[index];
    }

    removeItem(key: string): void {
        this.cookieService.remove(key);
    }

    setItem(key: string, data: string): void {
        this.cookieService.put(key, data);
    }
    setItemObject(key: string, data: any): void {
        this.cookieService.put(key, JSON.stringify(data));
    }
}
