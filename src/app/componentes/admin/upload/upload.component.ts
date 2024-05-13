import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', "../admin.component.css"]
})
export class UploadComponent {
  constructor(private uploadService:UploadService){

  }
  url:String="" 

  upload(event:any){
    const file = event.target.files[0]

    if(file){
      const formData = new FormData()
      formData.append("file", file)
      this.uploadService.uploadFile(formData).subscribe(response=>{
        this.url=response.url
      })
    }
  }
}
