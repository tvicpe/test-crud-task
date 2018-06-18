import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  readonly timeout: number = 6000;
  seconds: number = this.timeout / 1000 - 1;

  constructor(private router: Router) {
  }

  ngOnInit() {
    window.setInterval(() => {
      if (this.seconds > 0) {
        this.seconds -= 1;
      }
    }, 1000);

    window.setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, this.timeout);
  }

}
