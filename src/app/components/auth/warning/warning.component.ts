import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

  constructor(private route: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  login() {
    this.route.navigateByUrl('login');
    this.dialog.closeAll();
  }

}
