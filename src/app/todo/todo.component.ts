import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: any;
  index: String;
  constructor(private apiservice: ApiService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.params.subscribe(params => { this.index = params.index; });
  }

  ngOnInit() {
    this.getTodo();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { todo: this.todo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todo = result;
        this.apiservice.updateTodo(result, this.index).subscribe(res => {
        });
      } else {
        this.getTodo();
      }
    });
  }

  getTodo() {
    this.apiservice.getTodo(this.index).subscribe(res => {
      this.todo = res.json();
      this.todo.date = new Date(this.todo.date);
    });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
