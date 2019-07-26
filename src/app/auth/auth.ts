import { Injectable } from '@angular/core';
@Injectable()
export class authenticationInterceptor {
    constructor() {
        console.log("interceptor");
    }
}
