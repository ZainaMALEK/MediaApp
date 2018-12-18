import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MediaService } from '../media.service';



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

url ='';
medias: Media[] =[]
noResult:any = null;
author:string='';
user:string='';
type:string='';


    constructor(private mediaService: MediaService)
    {
      this.getMedias();

    }

    getMedias()
    {
      this.mediaService.getMedias(this.author, this.type)
      .subscribe((res: Media[]) => {
        this.medias= res;
        console.log(this.medias)
      })
    }


    saveLoaning(media_id){
      this.mediaService.newMediaLoaning(media_id, this.user)
      .subscribe(res =>{
        this.getMedias();

        //mettre à jour le DOM en mettant a joue this.media
      })
    }

    nbLoaning(){
      let loanedMedias = this.medias.filter(media => media.user == this.user)
      return loanedMedias.length;
    }








  ngOnInit() {
  }

}
