import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
    {
        path:"", 
        redirectTo:"login", 
        pathMatch:"full",
    },
    { 
        path: "login", 
        component: LoginComponent, 
        title: "Student App - Login"
    },
    { path:"", component:LayoutComponent,
        children:[
           { path: "admin-dashboard", component: AdminDashboardComponent },
           { path: "student-dashboard", component: StudentDashboardComponent },
        ]      
    },
     { path: "registration", component: RegistrationComponent },
    { path: "**", redirectTo: "login" }
    
];
