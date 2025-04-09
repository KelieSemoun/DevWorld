import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateArticleComponent
  },
  {
    path: ':id',
    component: ArticleDetailsComponent
  },
  { 
    path: '',
    component: FeedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
