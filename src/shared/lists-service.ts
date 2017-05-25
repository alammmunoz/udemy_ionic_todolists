import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Storage } from '@ionic/storage';
import { ListModel } from './list-model';
import { AppSettings } from './app-settings';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the ListsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ListsService {

  public lists: ListModel[] = [];

  constructor(public http: Http, public local: Storage) {
    this.getLists();
  }

  private getLists() {
    this.getFromLocal()
    .then(() => {this.getFromServer()},
          () => {this.getFromServer()});
  }

  public addList(name: string) {

    let observable = this.postNewListToServer(name);

    observable.subscribe(
      (list: ListModel) => {
        this.lists = [...this.lists, list];
        this.saveLocally();
      },
      error => console.log("error trying to post a new list to the server", error)
    );

    return observable;
  }

  private getFromLocal() {
    return this.local.ready().then(() => {
      return this.local.get('lists').then(
        data => {
          let localList: ListModel[] = [];
          if(data) {
            for(let list of data) {
              localList.push(new ListModel(list.name, list.id));
            }
          }
          this.lists = localList;
        }
      )
    })
  }

  private getFromServer() {
    this.http.get(`${AppSettings.API_ENDPOINT}/lists`)
    .map(response => {return response.json()})
    .map((lists: Object[]) => {
      return lists.map(item => ListModel.fromJson(item));
    })
    .subscribe(
      (result: ListModel[]) => {
        this.lists = result;
        this.saveLocally();
      },
      error => {
        console.log("Error loading list from server", error);
      }
    )
  }

  private postNewListToServer(name): Observable<ListModel> {
    let observable = this.http.post(`${AppSettings.API_ENDPOINT}/lists`, {name})
                      .share()
                      .map(response => response.json())
                      .map(list => ListModel.fromJson(list));

    observable.subscribe(() => {}, () => {});
    
    return observable;
  }

  public saveLocally() {
    this.local.ready().then(() => {
      this.local.set('lists', this.lists);
    })
  }

  private deleteListFromServer(id: number) {
    let observable = this.http.delete(`${AppSettings.API_ENDPOINT}/lists/${id}`)
    .map(response => response.json()).share();

    return observable;
  }

  public removeList(list: ListModel) {
    this.deleteListFromServer(list.id).subscribe(
      () => {
        let index = this.lists.indexOf(list);
        this.lists = [...this.lists.slice(0, index),
                      ...this.lists.slice(index +1)];
        this.saveLocally();
      },
      (error) => {console.log(`an error ocurred while trying to remove list: ${list.name}`);}
    )
  }
}
