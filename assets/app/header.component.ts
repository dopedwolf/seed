import {Component} from "@angular/core"
//routerLinkActive: is only applied when the nested routerLink is active
@Component ({
  selector: 'app-header',
  template: `
      <header class="row">
        <nav class="col-md-8 col-md-offset-2">
          <ul class="nav nav-pills">
            <li routerLinkActive="active">
              <a [routerLink]="['/messages']">Messenger</a>
            </li>
            <li routerLinkActive="active">
              <a [routerLink]="['/auth']">Authentication</a>
            </li>
          </ul>
        </nav>
      </header>
    `
})
export class HeaderComponent {

}
