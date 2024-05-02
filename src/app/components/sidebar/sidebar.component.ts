import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  dataSub: any[] = [
    {
      "id": 1,
      "name": 'AA1030',
      "open": '50',
      "showNewContent": false,
    },
    {
      "id": 2,
      "name": 'ARRR456',
      "open": '50%',
      "showNewContent": false,
    },
    {
      "id": 3,
      "name": 'ARRR789',
      "open": '60%',
      "showNewContent": false,
    }
  ];
  dataSub2: any[] = [
    {
      "id": 1,
      "name": 'AA1030',
      "open": '50',
      "showNewContent": false,
    },
    {
      "id": 2,
      "name": 'ARRR456',
      "open": '50%',
      "showNewContent": false,
    },
    {
      "id": 3,
      "name": 'ARRR789',
      "open": '60%',
      "showNewContent": false,
    }
  ];
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  constructor() { }

  ngOnInit(): void {
  }
  showCard: boolean = false;
  selectedItemDetails: any=null;
  updateCardContent(item: any) {
    item.showNewContent = true;
    this.selectedItemDetails = this.dataSub2.find(x => x.id === item.id);
    console.log(this.selectedItemDetails);
  }
  updateCardContent1(index: number) {
    this.dataSub[index].showNewContent = false;
  }
}
