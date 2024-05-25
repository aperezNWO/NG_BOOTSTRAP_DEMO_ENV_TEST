import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
   //
   public  _appBrand   : string = '';
   public  _appVersion : string = '';
   public _appEnv      : string = '';
   //
   public  _navbarCollapsed                                     : boolean = true;
   //
   public get _NavbarCollapsed() : boolean {
     //
     return this._navbarCollapsed;
   }
   //
   public set _NavbarCollapsed(p_navbarCollapsed: boolean) {
       //
       this._navbarCollapsed = p_navbarCollapsed;
   }

  pages =[
    {
      'url' : '/Home',
      'text': '[HOME]',
    },
    {
      'url': '/NgbootstrapWebComponent', 
      'text': '[NG BOOTSTRAP EXMPLES]',
    },  
  ]    
}
