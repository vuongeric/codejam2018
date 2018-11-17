import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {ICaptionThisResponse} from "./model/CaptionThisResponse";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private response: ICaptionThisResponse;

  constructor(private http: HttpClient) { }

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          console.log(droppedFile.relativePath, file);

          const formData = new FormData()
          formData.append('image', file, droppedFile.relativePath)


          this.http.post<ICaptionThisResponse>('http://localhost:5000/api/image', formData, {
            reportProgress: true,
            observe: 'events' 
          })
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                console.log('Upload Progress: ' + Math.round(event.loaded / event.total) * 100 + '%');
              } else if (event.type === HttpEventType.Response) {
                console.log(event.body);
                this.response = event.body;
                console.log(this.response);
              }
            })


        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
