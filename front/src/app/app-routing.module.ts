import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { ListComponent } from './features/topics/components/list/list.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { MeComponent } from './features/auth/components/me/me.component';
import { CreateArticleComponent } from './features/articles/components/create-article/create-article.component';
import { FeedComponent } from './features/articles/components/feed/feed.component';
import { ArticleDetailsComponent } from './features/articles/components/article-details/article-details.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'articles',
        component: FeedComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'articles/create',
        component: CreateArticleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'articles/:id',
        component: ArticleDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'topics',
        component: ListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'me',
        component: MeComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
