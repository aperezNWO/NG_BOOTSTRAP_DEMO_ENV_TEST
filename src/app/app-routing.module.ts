import { NgModule                } from '@angular/core';
import { RouterModule, Routes    } from '@angular/router';
import { HomeComponent           } from './_modules/home/home/home.component';
import { PageNotFoundComponent   } from './_modules/home/page-not-found/page-not-found.component';
import { NgbootstrapWebComponent } from './_modules/ngbootstrap/ngbootstrap-web/ngbootstrap-web.component';
import { AlertSampleComponent    } from './_modules/ngbootstrap/alert-sample/alert-sample.component';
import { TableSampleComponent    } from './_modules/ngbootstrap/table-sample/table-sample.component';

const routes: Routes = [
  {  path: 'Home'                     , component: HomeComponent                      },
  {  path: ''                         , component: HomeComponent                      },
  {  path: 'NgbootstrapWebComponent'  , component: NgbootstrapWebComponent            }, 
  {  path: 'AlertSampleComponent'     , component: AlertSampleComponent               },  
  {  path: 'TableSampleComponent'     , component: TableSampleComponent               },  
  {  path: '**'                       , component: PageNotFoundComponent              },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
