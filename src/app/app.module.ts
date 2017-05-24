import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TodosPage } from '../pages/todos/todos';
import { ListsPage } from '../pages/lists/lists'
import { AddTaskModal } from '../pages/add-task-modal/add-task-modal';
import { HttpModule } from '@angular/http';

import { TodoService } from '../shared/todo-service';
import { ListsService } from '../shared/lists-service';
import { PrioritizedTodosPipe } from '../pipes/prioritized-todos-pipe';
import { DoneTodosPipe } from '../pipes/done-todos-pipe';

@NgModule({
  declarations: [
    MyApp,
    TodosPage,
    ListsPage,
    AddTaskModal,
    PrioritizedTodosPipe,
    DoneTodosPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodosPage,
    ListsPage,
    AddTaskModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoService,
    ListsService
  ]
})
export class AppModule {}
