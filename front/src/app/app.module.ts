import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './features/topics/components/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './features/auth/components/login/login.component';
import { FormsModule } from '@angular/forms';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule
];

@NgModule({
  declarations: [AppComponent, HomeComponent, ListComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
