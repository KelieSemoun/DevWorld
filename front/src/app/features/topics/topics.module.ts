import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { ListComponent } from './components/list/list.component';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatButtonModule
]

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    ...materialModules
  ]
})
export class TopicsModule { }
