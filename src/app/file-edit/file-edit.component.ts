import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.css']
})
export class FileEditComponent implements OnInit {

  @Input() file: string = '';

  data: any
  constructor() { }

  async ngOnInit() {
    if (this.file) {
      const req = await fetch('http://localhost:36911/system/files/read', {
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
