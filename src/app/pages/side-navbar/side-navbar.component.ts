import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../core/interface/interface';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
})
export class SideNavbarComponent {
currentUser = signal<IUser | null>(null);
router = inject(Router)
ngOnInit(): void {
    const getUserEmail = localStorage.getItem("loggedUser")
    if(getUserEmail){
      this.currentUser.set(JSON.parse(getUserEmail))
    }
  
}

logout(){
  localStorage.removeItem("loggedUser");
  this.currentUser.set(null);
  this.router.navigateByUrl('/login');
}
}
