import { Headers, Http, Response, RequestOptions } from '@angular/http';

export class Constants{

    public userCreateSuccess = 'Información guardada con éxito.';
    public userUpdateSuccess = 'Información actualizada.';
    public userDeleteSuccess = 'Información eliminada.';

    server = 'https://envios.feuh.com.mx/';
    api = 'ws-v2/ws/users/';
    PATH_API = this.server + this.api;


    getHeaders(){
        let headers = new Headers();
        let opts = new RequestOptions();
        //headers.append('Authorization', 'Basic dXNlckFkbWluOkBwcFVzM3Ih');
        headers.append('Content-Type', 'application/json');
        opts.headers = headers;
        return opts;
    }

}