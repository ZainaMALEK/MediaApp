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
  private serverUrl: string='http://localhost:8000/';

  constructor(private http: HttpClient) {

  }

  getMedias(){
    //On renvois la promesse(phase 1 du traitement asynchrone)
    //on ne souscrit pas ici au niveau du service
    return this.http
    .get(this.serverUrl+'media/json');

  }

  newMediaLoaning(media_id:number, user:string){
    return this.http.post(
      this.serverUrl+'loaning/api', {'media_id': media_id, 'user':user}
    )
  }

}
