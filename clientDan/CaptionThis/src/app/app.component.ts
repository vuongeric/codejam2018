import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry} from 'ngx-file-drop';
import {ICaptionThisResponse} from "./model/CaptionThisResponse";
import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';
import {IQuote} from "./model/quote";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class AppComponent {
  private response: ICaptionThisResponse;
  private quotes: IQuote[];
  private url: any;
  private showImage: boolean = false;
  private showQuote: boolean = false;
  private loading: boolean = false;
  private currentQuote: string = '';
  private currentIndex: string = '';

  constructor(private http: HttpClient) {
  }

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.loading = true;
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          const formData = new FormData()
          formData.append('image', file, droppedFile.relativePath)

          var reader = new FileReader();
          reader.readAsDataURL(file); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            this.url = reader.result;
            this.showImage = true;
          }

          this.http.post<ICaptionThisResponse>('http://localhost:5000/api/image', formData, {
            reportProgress: true,
            observe: 'events'
          })
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                console.log('Upload Progress: ' + Math.round(event.loaded / event.total) * 100 + '%');
              } else if (event.type === HttpEventType.Response) {
                this.response = event.body
                this.quotes = this.response.quotes;
                console.log(this.response);
                this.loading = false;
                this.showQuote = true;
                this.nextQuote()
              }
            })


        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  nextQuote() {
    // if(this.quotes === undefined || this.quotes.length === 0) {
    //   return;
    // }
    // console.log(this.quotes);
    // this.currentIndex += 1;
    // this.currentIndex = this.currentIndex % this.quotes.length;
  }

  toggleShowQuote() {
    this.showQuote = !this.showQuote;
    console.log('showQuote', this.showQuote);
  }
  public fileOver(event) {
    console.log(event);
    this.showImage = false;
  }

  public fileLeave(event) {
    console.log(event);
  }

  onSelectFile(event) { // called each time file input changes
  }
}
