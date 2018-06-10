import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';             // Add this

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  goTo(route:string){
    this.router.navigate([route])
  }

}
