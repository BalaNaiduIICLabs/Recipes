import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { Contact } from './contact/contact';
import { Page404 } from './page404/page404';
import { RecipePage } from './recipe-page/recipe-page';
import { Favorite } from './favorite/favorite';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'menu', component:Menu},
    {path:'contact', component:Contact},
    {path:'recipePage/:idCategory', component:RecipePage},
    {path:'favorite', component:Favorite},
    {path:'**', component:Page404},

];
