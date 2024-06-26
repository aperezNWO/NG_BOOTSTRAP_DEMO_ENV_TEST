import { AppRoutingModule                    } from './app-routing.module';
import { AppComponent                        } from './app.component';
import { NgModule                            } from '@angular/core';
import { BrowserModule                       } from '@angular/platform-browser';
import { AsyncPipe, DecimalPipe              } from '@angular/common';
import { FormsModule                         } from '@angular/forms';
import { HttpClient, HttpClientModule        } from '@angular/common/http';
import { NgbHighlight, NgbModule             } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertSampleComponent    } from './_modules/ngbootstrap/alert-sample/alert-sample.component';
import { TableSampleComponent    } from './_modules/ngbootstrap/table-sample/table-sample.component';
import { NgbootstrapWebComponent } from './_modules/ngbootstrap/ngbootstrap-web/ngbootstrap-web.component';
import { NavComponent            } from './_modules/home/nav/nav.component';
import { HomeComponent           } from './_modules/home/home/home.component';
import { PageNotFoundComponent   } from './_modules/home/page-not-found/page-not-found.component';
import { NgbdSortableHeader      } from './_services/sortable.directive';
import { DemoService             } from './_services/demo.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AlertSampleComponent,
    TableSampleComponent,
    NgbootstrapWebComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbHighlight, 
    NgbdSortableHeader, 
    NgbPaginationModule,
    DecimalPipe, 
    FormsModule, 
    AsyncPipe, 
  ],
  providers: [DemoService, DecimalPipe, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
