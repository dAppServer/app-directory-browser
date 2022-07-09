import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  public working_directory: string = "/";
  public files:any
  constructor() { }

  ngOnInit(): void {
    this.getFileList().finally(() => console.log(this.files))
  }

  async getFileList() {

    const req = await fetch("http://localhost:36911/system/files/detailed-list", {
      method: 'POST',
      headers: {
        "Content-Type": "application/javascript"
      },
      body: JSON.stringify({path: this.working_directory})
    })

    this.files = await req.json()
  }

}
