import { Injectable } from '@angular/core';
import { CanLoad, Router,  Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


export const INTRO_KEY = 'intro-seen'; //Para marcar si ya se ha visto la intro.


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

    constructor(private router: Router) { }
 
    async canLoad(): Promise<boolean> {
        const hasSeenIntro = await Storage.get({key: INTRO_KEY});      
        if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
          return true;
        } else {
          this.router.navigateByUrl('/intro', { replaceUrl:true });
          return false;
        }
    }
        
}
