import { Component, inject, signal } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import Swal from 'sweetalert2';
import { EMPTY_SRUDENT, IStudent, IUser } from '../../core/interface/interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../core/services/main.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, map } from 'rxjs/operators';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FooterComponent, SideNavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent {
studentList = signal<IStudent[]>([]);
userList = signal<IUser[]>([]);
currentUser = signal<IUser | null>(null);
searchTerm = signal<string>('');
isAddView = signal<boolean>(false);
studentForm!:FormGroup;
mainSevice = inject(MainService)
router = inject(Router)
  
  ngOnInit(): void {
    const getUserEmail = localStorage.getItem("loggedUser")
    if(getUserEmail){
      this.currentUser.set(JSON.parse(getUserEmail))
    }
    this.showAllStudent()
  }


resetForm(){
  this.studentForm.reset(EMPTY_SRUDENT);
  this.showAllStudent();
  this.isAddView.set(false)   
}

showAllStudent() {
  this.mainSevice.usersLogin().pipe(
    switchMap((users: IUser[]) => {
      this.userList.set(users);
      return this.mainSevice.getStudents().pipe(
        map((students: IStudent[]) => {
          return students.map(student => {
            const matchingUser = users.find(u => u.fullName === student.fullName);
            return {
              ...structuredClone(student),
              isEdit: false,   
              email: matchingUser ? matchingUser.email : 'No Email Found' 
            };
          });
        })
      );
    })
  ).subscribe({
    next: (mergedData: IStudent[]) => { 
      this.studentList.set(mergedData);
    },
    error: (err) => console.error("Data load failed", err)
  });
}

onSearch(event:any){
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    console.log(this.searchTerm())
}

getStudentById(student: any) {
  Swal.fire({
    title: '', 
    width: '90%', 
    padding: '0', 
    showConfirmButton: false,
    showCloseButton: true, 
    customClass: {
      popup: 'rounded-4 overflow-hidden border-0'
    },
    didOpen: (popup) => {
      popup.style.maxWidth = '900px'; 
    },
    html: `
      <div class="text-start" style="font-family: 'Inter', sans-serif;">
        
        <div class="p-5 text-white" style=" background: linear-gradient(132deg, #87193fa3 23%, #ffc107 100%);">
          <div class="d-flex align-items-center gap-4">
            <div class="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center fw-bold shadow" 
                 style="width: 90px; height: 90px; font-size: 2.5rem; flex-shrink: 0;">
              ${student.fullName?.charAt(0)}
            </div>
            <div>
              <h2 class="fw-bold m-0" style="letter-spacing: -1px;">${student.fullName}</h2>
              <p class="text-white-50 m-0 fs-5">${student.email || 'No email associated'}</p>
              <div class="mt-2">
                <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">Active Record</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-5 bg-white">
          <div class="row g-5">
            
            <div class="col-md-6">
              <h6 class="text-uppercase text-muted fw-bold small tracking-widest mb-4">Personal Details</h6>
              
              <div class="mb-4">
                <label class="d-block text-muted small mb-1">Contact Number</label>
                <div class="fw-semibold fs-5 text-slate-900">${student.mobileNo}</div>
              </div>

              <div class="mb-4">
                <label class="d-block text-muted small mb-1">Caste / Category</label>
                <div class="fw-semibold fs-5 text-slate-900 text-capitalize">${student.caste}</div>
              </div>

              <div class="mb-0">
                <label class="d-block text-muted small mb-1">Full Identity Name</label>
                <div class="text-slate-600">${student.firstName} ${student.middleName} ${student.lastName}</div>
              </div>
            </div>

            <div class="col-md-6">
              <h6 class="text-uppercase text-muted fw-bold small tracking-widest mb-4">Academic Scores</h6>
              
              <div class="d-flex justify-content-between align-items-center p-3 rounded-4 bg-slate-50 border mb-3">
                <span class="text-muted">10th Standard</span>
                <span class="fw-bold fs-5">${student.percentage10th}%</span>
              </div>

              <div class="d-flex justify-content-between align-items-center p-3 rounded-4 bg-slate-50 border mb-3">
                <span class="text-muted">12th Standard</span>
                <span class="fw-bold fs-5">${student.percentage12th}%</span>
              </div>

              <div class="d-flex justify-content-between align-items-center p-3 rounded-4 bg-slate-50 border mb-3">
                <span class="text-muted">Graduation</span>
                <span class="fw-bold fs-5">${student.gradPercentage}%</span>
              </div>
            </div>

            <div class="col-12 mt-2">
              <div class="p-4 rounded-4" style="background-color: #f8fafc; border: 1px solid #e2e8f0;">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fw-bold text-slate-900 fs-5">Overall Average Performance</span>
                  <span class="fw-extrabold text-primary fs-5">${student.average}%</span>
                </div>
                <div class="progress" style="height: 12px; background-color: #e2e8f0; border-radius: 10px;">
                  <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                       style="width: ${student.average}%; border-radius: 10px;"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `
  });
}
deleteCompleteRecord(student: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: "Student aur Login dono delete ho jayenge!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete All'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.mainSevice.deleteStudents(student).subscribe({
        next: (res) => {   
          this.mainSevice.usersLogin().subscribe((allUsers: IUser[]) => {            
            const userToKill = allUsers.find(u => u.fullName === student.fullName);            
            if (userToKill && userToKill.id) {           
              this.mainSevice.deleteLoginUser(userToKill.id).subscribe({
                next: () => {
                  Swal.fire('Deleted!', 'Record removed from both tables.', 'success');
                  this.showAllStudent();
                   }
              });
            } else {
              Swal.fire('Deleted!', 'Student deleted, but login user not found.', 'info');
              this.showAllStudent(); 
            }
          });
        },
        error: (err) => {
          Swal.fire('Error', 'Student delete nahi ho paya', 'error');
        }
      });
    }
  });
}
  logout(){
    //remve the data from local storatge
  localStorage.removeItem("loggedUser");
    this.currentUser.set(null);
    this.router.navigateByUrl('/slogin');
}



  nextPage(){

  }
  previousPage(){
    
  }



}
