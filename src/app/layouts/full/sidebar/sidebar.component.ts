import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LocalStoreService } from '../../../services/local-store.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  public userName:any;
  public typeUser:any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private localStorage:LocalStoreService,
    public cookieService: CookieService,
    private router: Router
  ) {
    this.userName = this.localStorage.getItem("fullName")
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.typeUser = this.localStorage.getItem("type");
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  cerarSesion(){
    this.router.navigate(['login'])
  }


  public getMenus(){
    if(this.localStorage.getItem("type")==1){
      return this.menuItems.getMenuitem();
    }else if(this.localStorage.getItem("type")==2){
      return this.menuItems.getMenuitemAdmin();
    }

  }

}
