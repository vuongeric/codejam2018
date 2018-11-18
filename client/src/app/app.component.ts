import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  selectedFile: File = null;
  constructor(private http: HttpClient) {}
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    // const test = { "id": "1" };
    fd.append("image", this.selectedFile, this.selectedFile.name);
    // console.log(test);
    console.log(fd);
    this.http.post("http://localhost:5000/api/image/", fd).subscribe(res => {
      console.log(res);
    });
  }
}
