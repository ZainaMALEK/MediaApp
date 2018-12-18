import { Component, OnInit } from '@angular/core';
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
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  url ='';
  medias: Media[] =[]
  noResult:any = null;
  author:string='';
  user:string='';
  type:string='';

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
  }

}
