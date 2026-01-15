import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../../core/services/main.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from "@angular/router";
import { IUser } from '../../core/interface/interface';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginUsersForm!: FormGroup;
  mainSevice = inject(MainService)
  router = inject(Router)

  ngOnInit(): void {
    this.userLoginForm()
  }
  userLoginForm() {
    this.loginUsersForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
      role: new FormControl("", []),
    })
  }

  onLogin() {
    // 1. Validation Check
    if (this.loginUsersForm.invalid) {
      this.loginUsersForm.markAllAsTouched();
      return;
    }

    const loginFormData = this.loginUsersForm.value;
    // 2. Service Call
    this.mainSevice.usersLogin().subscribe({
      next: (users: IUser[]) => {
        console.log("API Response received:", users);

        const userFound = users.find((u: IUser) =>
          u.email.trim() === loginFormData.email.trim() &&
          u.password === loginFormData.password
        );

        if (userFound) {
          localStorage.setItem("loggedUser", JSON.stringify(userFound));

          if (userFound.role.toLowerCase() === 'admin') {
            console.log("Navigating to Admin...");
            this.router.navigateByUrl('/admin-dashboard');
          } else if (userFound.role.toLowerCase() === 'student') {
            this.router.navigate(['/student-dashboard']);
          } else {
            console.error("Role match nahi hua:", userFound.role);
            Swal.fire('Error!', 'Role not recognized', 'warning');
          }
        } else {
          console.warn("User matching failed for:", loginFormData.email);
          Swal.fire('Error!', 'Invalid Credentials', 'error');
        }
      },
      error: (err) => {
        console.error("API Error Details:", err);
        Swal.fire('Server Error!', 'Could not reach API', 'error');
      }
    });
  }
}
