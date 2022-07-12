import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ITreeOptions, TreeComponent, TreeNode} from '@circlon/angular-tree-component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  public files:any
  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this),
    useCheckbox: false
  };

  nodes: any[] = [];

  asyncChildren = [
    {
      name: 'child1',
      hasChildren: true
    }, {
      name: 'child2'
    }
  ];
  @ViewChild('tree') tree?: TreeComponent;
  @Output() FileEvent = new EventEmitter<string>();
  constructor() { }

  async ngOnInit() {
    this.nodes = await this.getFileList()
  }

  async getFileList(dir: string = '/') {

    const req = await fetch("http://localhost:36911/system/files/detailed-list", {
      method: 'POST',
      headers: {
        "Content-Type": "application/javascript"
      },
      body: JSON.stringify({path: dir})
    })

    this.files = await req.json()

    return this.files

      .sort((a:any,b:any) => a.name.startsWith('.') < b.name.startsWith('.'))
      .sort((a:any,b:any) => a.isDirectory < b.isDirectory)
      .map((file: any) => this.mapData(file))

  }

  mapData(file: {name: string, isFile: boolean, isDirectory: boolean}){
    return {
      name: file.name,
      hasChildren: file.isDirectory
    }
  }


  getNodePath(node: TreeNode):string{
    const lineage = [];
    // add clicked node as first item
    lineage.push(node.data.name);

    // grab parent of clicked node
    let parent = node.parent;

    // loop through parents until the root of the tree is reached
    while(parent !== null){
      lineage.push(parent.data.name);
      parent = parent.parent;
    }
    return lineage.reverse().join('/')
  }
  getChildren(node: TreeNode) {


    console.log(this.getNodePath(node))
    return this.getFileList( this.getNodePath(node))

  }
}
