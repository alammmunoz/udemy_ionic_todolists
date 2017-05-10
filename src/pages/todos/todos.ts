import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Todos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  public todos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Todos');
    this.todos = [
      {
        description: "esto es una tarea",
        isDone: false
      },
      {
        description: "esto es otra tarea",
        isDone: false
      },
      {
        description: "esto es una tercera tarea",
        isDone: false
      },
      {
        description: "esto es una cuarta tarea",
        isDone: false
      },
      {
        description: "esto es una quinta tarea",
        isDone: false
      },
      {
        description: "esto es una sexta tarea",
        isDone: false
      }
    ];
  }

}
