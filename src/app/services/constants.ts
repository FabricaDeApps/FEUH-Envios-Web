import { Headers, Http, Response, RequestOptions } from '@angular/http';

export class Constants{

    public userCreateSuccess = 'Información guardada con éxito.';
    public userUpdateSuccess = 'Información actualizada.';
    public userDeleteSuccess = 'Información eliminada.';

    server = 'https://feuh.com.mx:8082/';
    api = 'api/v1/';
    PATH_API = this.server + this.api;


    getHeaders(){
        let headers = new Headers();
        let opts = new RequestOptions();
        headers.append('Authorization', 'Basic RkVVSEZBQkFQUFMyMDIxOkZFVUhGQUJSSUNBREVBUFBTMjAyMURFVkVMT1BNRU5U');
        headers.append('Content-Type', 'application/json');
        opts.headers = headers;
        return opts;
    }

}