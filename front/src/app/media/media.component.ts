import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Media {
  id: number;
  type:string;
  title:string;
  author:string;
}

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})

export class MediaComponent implements OnInit {
url ='';
medias: Media[];


  constructor(private http:HttpClient )
  {
      this.url = 'http://localhost:8000/media/json';
      this.http.get(this.url)
     .subscribe((res:Media[]) => {
       this.medias = res;
       console.log(res);
     });

   }

  ngOnInit() {
  }

}
