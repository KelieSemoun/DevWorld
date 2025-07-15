import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { FeedComponent } from './components/feed/feed.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from "src/app/shared/shared.module";

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    ArticleDetailsComponent,
    CreateArticleComponent,
    FeedComponent
  ],
  imports: [
    ArticlesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    SharedModule
]
})
export class ArticlesModule { }
