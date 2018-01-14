import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class SdkService {

    constructor(private http: Http) {}

    API_PREFIX = ' http://localhost:80/';

    sendAjaxForGet(pUrl, scb, fcb) {
        this.http.get(pUrl)
            .subscribe(
                function (response) {
                    scb(JSON.parse(response['_body']));
                },
                function (error) {
                    fcb(error);
                },
                function () {
                    console.log('call handled successfully');
                }
            );
    }

    getCPUUtilization(scb, fcb) {
        const url = this.API_PREFIX + 'cpu-utilization';
        this.sendAjaxForGet(url, scb, fcb);
    }


}
