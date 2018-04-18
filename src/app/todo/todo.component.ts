import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: any;
  index: String;
  constructor(private apiservice: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => { this.index = params.index; });
  }

  ngOnInit() {
    this.getTodo();
  }

  getTodo() {
    this.apiservice.getTodo(this.index).subscribe(res => {
      this.todo = res.json();
      this.todo.date = new Date(this.todo.date);
      console.log(this.todo);
    });
  }
}
