import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFile: File = null;
  
  constructor(private http: HttpClient) {}
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:5000/api/image', fd, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
      if(event.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress: ' + Math.round(event.loaded/event.total) * 100 + '%');
      } else if(event.type === HttpEventType.Response){
        console.log(event);
      }
    })
  }
}
