import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls:['./menu.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatMenuModule, RouterModule],
  })

export default class menuBar{}