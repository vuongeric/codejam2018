import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ICaptionThisResponse } from "./model/CaptionThisResponse";
import { trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';
import { IQuote } from "./model/quote";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({height: 0, overflow: 'hidden'}), animate('.3s ease', style({height: '*'}))]),
      transition(':leave', [style({height: '*', overflow: 'hidden'}), animate('.3s ease', style({height: 0}))])
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
  private currentQuote: IQuote;
  private currentIndex: number;
  private currentHashTags;
  private showWelcomeMessage = true;

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      "particles": {
        "number": {
          "value": 160,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#4a80be"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#232741"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 4,
            "size_min": 0.3,
            "sync": false
          }
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "top-right",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble"
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 250,
            "size": 0,
            "duration": 2,
            "opacity": 0,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    };
  }

  constructor(private http: HttpClient) {
  }

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.loading = true;
    this.files = event.files;
    this.showWelcomeMessage = false;
    if(this.showImage) {
      this.showImage = false;
    }


    for (const droppedFile of event.files) {
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
                let hashTags = '';
                this.response.keywords.map(keyword => hashTags += '#' + keyword.split(' ').join('') + ' ');
                this.currentHashTags = hashTags;
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
    if (this.quotes === undefined || this.quotes.length === 0) {
      return;
    }
    this.showQuote = false;
    setTimeout(() => {
      if (this.currentIndex === null) {
        this.currentIndex = 0;
        this.currentQuote = this.quotes[this.currentIndex];
        console.log(this.currentQuote);
      } else {
        console.log(this.currentIndex);
        this.currentIndex += 1;
        this.currentIndex = this.currentIndex % this.quotes.length;
        console.log(this.currentIndex);
        this.currentQuote = this.quotes[this.currentIndex];
        console.log(this.currentQuote);
      }
      this.showQuote = true;
    }, 300)
  }

  public fileOver(event) {
    console.log(event);
    this.showImage = false;
    this.currentIndex = null;
    this.currentHashTags = null;
    this.showQuote = false;
    this.quotes = null;
  }

  public fileLeave(event) {
    console.log(event);
  }

  onSelectFile(event) { // called each time file input changes
  }
}
