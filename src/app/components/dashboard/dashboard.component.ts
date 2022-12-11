import { Task } from './../../model/task';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  taskObj:Task = new Task();
  taskArr:Task[] = [];

  addTaskValue:string = '';
  editTaskValue:string = '';

  show:boolean = false;

  constructor(private crudService:CrudService) {}
  ngOnInit(): void {
    this.show = false;
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTasks().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert('Unable to get list of all tasks')
    })
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err)
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert('Failed to edit the task')
    })
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert('Failed to delete task')
    })
  }

  call(etask:Task) {
    this.show = true;
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
