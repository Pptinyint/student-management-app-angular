import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { single } from 'rxjs';
import { IStudent, IUser } from '../../core/interface/interface';
import { splitFullName } from '../../core/utils/common-utils';
import { MainService } from '../../core/services/main.service';
import { Router } from '@angular/router';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, SideNavbarComponent, FooterComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})

export class StudentDashboardComponent implements OnInit {
studentList = signal<IStudent[]>([]);
currentUser = signal<IUser | null>(null);
isDataSaved = signal<boolean>(false);
mainSevice = inject(MainService)
router = inject(Router)
studentForm!:FormGroup;

  ngOnInit(): void {
    this.userRegisterFormFields()
   const getUserData = localStorage.getItem("loggedUser");
if(getUserData){
  const user = JSON.parse(getUserData);
  this.currentUser.set(user);


  if (!user.firstName && user.fullName) {
   const names = splitFullName(user.fullName);
 user.firstName = names.firstName;
 user.lastName = names.lastName;
 user.middleName = names.middleName;
  }
  this.studentForm.patchValue(user);
  if (user.caste && user.percentage10th) {
      this.isDataSaved.set(true);
      this.studentForm.get('caste')?.disable();
    }
}

  }

userRegisterFormFields(){
  this.studentForm= new FormGroup({
      id:new FormControl(0),
      firstName:new FormControl("", [Validators.required]),
      middleName:new FormControl("", []),
      lastName:new FormControl("", []),
      fullName:new FormControl({ value: '', disabled: false }),
      caste:new FormControl("", [Validators.required]),
      mobileNo:new FormControl("", [Validators.required]),
      percentage10th:new FormControl("", [Validators.required]),
      percentage12th:new FormControl("", [Validators.required]),
      gradPercentage:new FormControl("", [Validators.required]),
      average:new FormControl("", [])
  })
}

get calculateAvg() {
  const p10 = Number(this.studentForm.get('percentage10th')?.value) || 0;
  const p12 = Number(this.studentForm.get('percentage12th')?.value) || 0;
  const grad = Number(this.studentForm.get('gradPercentage')?.value) || 0;
  
  const avg = (p10 + p12 + grad) / 3;
  return avg.toFixed(2);
}

editStudent() {
  this.isDataSaved.set(true);
}

  updateStudent() {
if (this.studentForm.invalid) {
    this.studentForm.markAllAsTouched(); 
    Swal.fire('Form Invalid', 'Please fill all required fields', 'warning');
    return;
  }

const avgValue = this.calculateAvg;
this.studentForm.get('average')?.setValue(avgValue)

const payload = this.studentForm.getRawValue();
Swal.showLoading();

this.mainSevice.updateStudent(payload).subscribe({
  next:(res:IStudent)=>{
      this.isDataSaved.set(true);
      const currentUserData = this.currentUser();
      this.studentForm.get('caste')?.disable();
      if (currentUserData) {
        const finalUserData = structuredClone({ ...currentUserData, ...payload })
        localStorage.setItem("loggedUser", JSON.stringify(finalUserData));
        this.currentUser.set(finalUserData);
      }

Swal.fire('Success!', 'Data has been saved to database.', 'success');
  },
  error: (err) => {
      Swal.fire('Error!', 'Failed to save data. Please try again.', 'error');
      console.error(err);
    }
})
  }


  logout(){
  localStorage.removeItem("loggedUser")
    this.currentUser.set(null);
    this.router.navigateByUrl('/login');
}
 
}
