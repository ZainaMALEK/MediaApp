import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Media {
  id: number;
  type:string;
  title:string;
  author:string;
}

@Injectable({
  providedIn: 'root'
})


export class MediaService {
  medias: Media[];
  private serverUrl: string='http://localhost:8000/media/json';

  constructor(private http: HttpClient) {

  }

  getMedia(){
    //On renvois la promesse(phase 1 du traitement asynchrone)
    //on ne souscrit pas ici au niveau du service
    return this.http
    .get(this.serverUrl);

  }

}
