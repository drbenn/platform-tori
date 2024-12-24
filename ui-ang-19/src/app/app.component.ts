import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './views/todo/todo.component';
import { NumberComponent } from './views/number/number.component';
import { BigNumberComponent } from './views/big-number/big-number.component';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, TabsModule, TodoComponent, NumberComponent, BigNumberComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tabs: { title: string, value: string,  component: any }[] = [];

  ngOnInit(): void {
    this.tabs = [
      { title: 'Todo', value: '0', component: TodoComponent },
      { title: 'Tab 2', value: '1', component: NumberComponent },
      { title: 'Open AI', value: '2', component: BigNumberComponent },
    ];
  }
}
