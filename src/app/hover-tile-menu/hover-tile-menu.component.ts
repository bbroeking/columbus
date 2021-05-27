import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hover-tile-menu',
  templateUrl: './hover-tile-menu.component.html',
  styleUrls: ['./hover-tile-menu.component.less']
})
export class HoverTileMenuComponent implements OnInit {

  // @HostBinding("style.left")x = "0px";
  // @HostBinding("style.top") y = "0px";
  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "200px"
 
  constructor() { }
 
  ngOnInit() {
  }
 
  open(e:MouseEvent) { 
    // this.x = `${e.pageX}px`
    // this.y = `${e.pageY}px`
    this.visibility = "visible"
    
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }

}
