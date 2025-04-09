import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MeComponent } from './me.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
]

@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ...materialModules
  ]
})
export class MeModule { }
