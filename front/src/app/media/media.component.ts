import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MediaService } from '../media.service';



interface Media {
  id: number;
  type:string;
  title:string;
  author:string;
}

interface Loaning {
  media: Media;
  //start: date;
  //end: date;
  user: string;
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


    constructor(private mediaService: MediaService){
       this.mediaService.getMedia()
       .subscribe((res: Media[]) => {
         this.medias= res
       })
    }


  // constructor(private http:HttpClient )
  // {
  //     this.url = 'http://localhost:8000/media/json';
  //     this.http.get(this.url)
  //    .subscribe((res:Media[]) => {
  //      this.medias = res;
  //      console.log(res);
  //    });
  //
  //  }

   getMedias() {
     let url: string = 'http://localhost:8000/media/json';
     url += `?author=${this.author}`;

     this.http.get(url)
       .subscribe((res:Media[]) =>{
         this.medias = res;
         console.log(res);
       });
   }

   test(media_id){
     console.log(this.user, media_id)
     let url: string = 'http://localhost:8000/loaning';

     let loaning={
       "media_id":media_id,
       "user": this.user
     }
     this.http.post(url,loaning )
       .subscribe((res) =>{

         console.log(res);
       });

   }



  ngOnInit() {
  }

}
