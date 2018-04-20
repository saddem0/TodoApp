import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos = [];
  newTodo = {};
  constructor(private apiservice: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTodos();
  }
  getTodos() {
    this.apiservice.getTodos().subscribe(res => {
      this.todos = res.json();
      for (let i = 0; i < this.todos.length; i++) {
        this.todos[i].date = new Date(this.todos[i].date);
      }
      console.log(this.todos);
    });
  }
  openDialog(): void {
    this.newTodo = {};
    const dialogRef = this.dialog.open(DialogAddTodoComponent, {
      width: '250px',
      data: { todo: this.newTodo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newTodo = result;
        this.newTodo['done'] = false;
        this.newTodo['date'] = new Date();
        this.apiservice.addTodo(this.newTodo).subscribe(res => {
          this.todos.push(this.newTodo);
        });
      }
    });
  }

  deleteTodo(i) {
    console.log(i);
    this.apiservice.deleteTodo(i).subscribe(res => {
      this.todos.splice(i, 1);
    });
  }
}


@Component({
  selector: 'app-dialog-add-todo',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogAddTodoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.data = undefined;
    this.dialogRef.close();
  }

}
