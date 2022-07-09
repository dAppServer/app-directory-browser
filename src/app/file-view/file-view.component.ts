import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {

  @Input() file?: string;

  public data: any;
  constructor() { }

  async ngOnInit() {
    if (this.file) {
      const req = await fetch('http://localhost:36911/system/files/read',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({path: this.file})
      })
      this.data = atob(await req.text())
    }
  }

}
