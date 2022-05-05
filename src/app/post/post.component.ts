import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() title: string = "";
  @Input() image: string = "";
  @Input() rating: any = 0;
  @Input() description: string = "";
  @Input() attendance: any = 0;
  @Input() link: string = "";
  @Input() postID: number = -1;
  @Input() paymentTypes: string[] = [];
  
  twitterText: string = ``;
  twitterUrl: any = "";

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.twitterText = encodeURI(`I'm going to ${this.title} on MyMotown! Check it out here: \nhttps://mymotown-5cc38.firebaseapp.com${this.link}`);
    this.twitterUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://twitter.com/intent/tweet?source=tweetbutton&text=${this.twitterText}`);
  }
}