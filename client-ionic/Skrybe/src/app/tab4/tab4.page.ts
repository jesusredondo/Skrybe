import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

    constructor(private authService: AuthenticationService, private router: Router) {}
 
    async logout() {
      await this.authService.logout();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }

}
