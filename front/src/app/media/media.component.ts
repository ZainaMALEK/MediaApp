import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



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
medias: Media[];
noResult:any = null;
author:string;



  constructor(private http:HttpClient )
  {
      this.url = 'http://localhost:8000/media/json';
      this.http.get(this.url)
     .subscribe((res:Media[]) => {
       this.medias = res;
       console.log(res);
     });

   }

   getMedias() {


   let url: string = 'http://localhost:8000/media/json';
   url += `?author=${this.author}`;

   this.http.get(url)
     .subscribe((res:Media[]) =>{
       this.medias = res;
       console.log(res);
     });


 }



  ngOnInit() {
  }

}
