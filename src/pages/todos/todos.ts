import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, LoadingController } from 'ionic-angular';

import { TodoModel } from '../../shared/todo-model';
import { ListModel } from '../../shared/list-model';
import { TodoService } from '../../shared/todo-service';
import { AddTaskModal } from '../add-task-modal/add-task-modal';



/**
 * Generated class for the Todos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html'
})
export class TodosPage {

  private toogleTodoTimeout = null;
  private list: ListModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public todoService: TodoService,
    private platform: Platform,
    private loadingCtrl: LoadingController) {

      this.list = this.navParams.get('list');
      this.todoService.loadFromList(this.list.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Todos');
  }

  ionViewWillUnload() {
    this.todoService.saveLocally(this.list.id);
  }

  setTodoStyles(item: TodoModel) {

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    };

    return styles;
  }

  toogleTodo(todo: TodoModel) {
    if(this.toogleTodoTimeout)
      return;

    this.toogleTodoTimeout = setTimeout(() => {
    this.todoService.toogleTodo(todo);
    this.toogleTodoTimeout = null;
    }, this.platform.is('ios') ? 0: 300);
  }

  removeTodo(todo: TodoModel) {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.todoService.removeTodo(todo)
    .subscribe(() => loader.dismiss(), ()=> loader.dismiss());
  }

  updateTodo(originalTodo: TodoModel, modifiedTodo: TodoModel) {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.todoService.updateTodo(originalTodo, modifiedTodo)
    .subscribe(() => loader.dismiss(), () => loader.dismiss());
  }

  showEditTodo(todo: TodoModel) {
    let modal = this.modalCtrl.create(AddTaskModal, {todo});

    modal.present();
    modal.onDidDismiss(data=> {
      if(data) {
        this.updateTodo(todo, data);
      }
    });
  }

  addTodo(todo: TodoModel) {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.todoService.addTodo(todo)
    .subscribe(() => loader.dismiss(), () => loader.dismiss());
  }

  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModal, {listId: this.list.id});
    modal.present();

    modal.onDidDismiss(data => {
      if(data) {
        this.addTodo(data);
      }
    });
  }
}
