import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../../core/services/main.service';
import { EMPTY_SRUDENT, IStudent, IUser } from '../../core/interface/interface';
import { splitFullName } from '../../core/utils/common-utils';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent  implements OnInit{
loginUsersForm!:FormGroup;
//  editId: string | null = null;
 mainSevice = inject(MainService) 

  ngOnInit(): void {
    this.userRegisterFormFields();
    const getUserData = localStorage.getItem("loggedUser");
    if (getUserData) {
      const user = JSON.parse(getUserData);
      this.loginUsersForm.patchValue(user);

    }
  }

userRegisterFormFields(){
  this.loginUsersForm= new FormGroup({
      id:new FormControl(0),
      fullName:new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z]+\s+[a-zA-Z]+$/)]),
      email:new FormControl("", [Validators.required, Validators.email]),
      password:new FormControl("", [Validators.required, Validators.minLength(5)]),
      role:new FormControl("", [Validators.required]),
  })
}

  onRegistrationClick() {
    if (this.loginUsersForm.invalid) {
      this.loginUsersForm.markAllAsTouched();
      return;
    }
    const formData = this.loginUsersForm.value;
    this.mainSevice.createNewuser(formData).subscribe({
      next: (resUser: IUser) => {
        const names = splitFullName(formData.fullName);
        const studentData: IStudent = {
          ...EMPTY_SRUDENT,
          fullName: formData.fullName,
          firstName: names.firstName,
          middleName: names.middleName,
          lastName: names.lastName,
          mobileNo: "",
          caste: "",
          percentage10th: 0,
          percentage12th: 0,
          gradPercentage: 0,
          average: 0
        }
        this.mainSevice.createNewStudent(studentData).subscribe({
          next: (resStudent: IStudent) => {
            Swal.fire('Success', 'Account & Student Profile Created!', 'success');
            localStorage.setItem("loggedUser", JSON.stringify(studentData));
            this.loginUsersForm.reset();
          },
          error: (err) => {
            Swal.fire('Error!', 'Could not create student profile.', 'error');
          }
        });
      }, error: (err) => {
        Swal.fire('Error!', 'User registration failed.', 'error');
      }
    })
  }
}