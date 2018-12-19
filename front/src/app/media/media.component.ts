import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MediaService } from '../media.service';
import { delay } from 'rxjs/operators';



interface Media {
  id: number;
  type:string;
  title:string;
  author:string;
  start:string;
  end:string;
  user:string;

}



@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})

export class MediaComponent implements OnInit {
serverUrl: string='http://localhost:8000/'
url ='';
medias: Media[] =[]
noResult:any = null;
author:string='';
user:string='';
type:string='';
historyMedias:Media[]=[]
historyUser:string='';
hidden:boolean = false;
loadingIndex:number =-1;


    constructor(private mediaService: MediaService)
    {
      this.getMedias();

    }

    getMedias()
    {
      this.mediaService
      .getMedias(this.author, this.type)
      .pipe(
      delay(1000))
      .subscribe((res: Media[]) => {
        this.medias= res;
        console.log(this.medias)
      })
    }


    saveLoaning(media_id){
      this.loadingIndex = 1;
      this.mediaService.newMediaLoaning(media_id, this.user)
      .pipe(
      delay(2000))
      .subscribe(res =>{
        this.getMedias();
        //mettre à jour le DOM en mettant a joue this.media
        this.loadingIndex= -1;
      })
    }

    nbLoaning(){
      let loanedMedias = this.medias.filter(media => media.user == this.user)
      return loanedMedias.length;
    }

    history(user){
      if(this.historyUser==user)
        this.historyUser='';
      else{
        this.mediaService.getHistoryService(user)
        .subscribe((res: Media[]) => {
          this.historyMedias= res;
          console.log(this.historyMedias)
          this.historyUser = user;
        })
      }
    }

    toggle(){
      this.hidden=!this.hidden;
    }








  ngOnInit() {
  }

}
