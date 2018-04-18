import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos = [];
  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.getTodos();
  }
  getTodos() {
    this.apiservice.getTodos().subscribe(res => {
      this.todos = res.json();
      for (let i = 0; i < this.todos.length; i++) {
        this.todos[i].date = new Date(this.todos[i].date);
      }
    });
  }
}
