import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  notes: number[];

  constructor() { }

  ngOnInit() {
    let source = interval(1000);//fonction qui produit un Observable
    source
      .pipe(
        
        map(val=> val+ 10),
        map(val=> val*2)
      )

    source.subscribe(val => console.log(val))
  }

}
