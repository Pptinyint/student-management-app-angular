<div class="container-fluid bg-slate-50 vh-100 p-0 overflow-hidden">
    <div class="d-flex h-100">

        <aside class="sidebar-modern d-none d-lg-flex flex-column p-4 border-end bg-white">
            <div class="brand-logo mb-5">
                <div class="logo-icon">S</div>
                <span class="ms-2 fw-bold tracking-tighter">STUDENT.IO</span>
            </div>
            <nav class="nav flex-column gap-3">
                <a class="nav-item-new active" routerLink="/admin-dashboard"><i class="bi bi-grid-1x2-fill me-3"></i> Students</a>
            </nav>

            <div class="mt-auto border-top pt-3">
                <button class="btn btn-link text-danger text-decoration-none fw-bold small p-0" (click)="logout()">
                    <i class="bi bi-box-arrow-left me-2"></i> Sign Out
                </button>
            </div>
        </aside>

        <main class="flex-grow-1 p-5 overflow-auto bg-slate-50 d-flex flex-column">

            <div class="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 class="fw-bold tracking-tight text-slate-900 m-0">Directory</h2>
                    <small class="text-muted">Manage your student records</small>
                </div>

                <div class="d-flex gap-4 align-items-center">
                    <div class="search-box d-none d-md-block">
                        <input type="text" class="form-control border-0 bg-white shadow-sm rounded-pill px-4"
                            placeholder="Search...">
                    </div>



                    <div class="admin-profile-wide d-flex align-items-center bg-white shadow-sm rounded-pill  pe-3 border transition-all"
                        style="min-width: 320px;">

                        <div class="admin-avatar shadow-sm text-white bg-dark  d-flex align-items-center justify-content-center fw-bold me-3"
                           style=" width: 77px;
    height: 42px;
    flex-shrink: 0;
    border-radius: 17px 0px 0px 17px;
    line-height: 20px;">
                            <!-- {{ currentUser()?.role?.charAt(0) | uppercase }} -->
                             {{ currentUser()?.role | uppercase }}
                            <!-- {{ currentUser()?.role | slice:0:1 | uppercase }} -->
                            <!-- {{ currentUser()?.role?.[0] | uppercase }} -->
                        </div>

                        <div class="flex-grow-1 d-none d-sm-block overflow-hidden">
                            @if(currentUser()?.role === "admin"){
                            <div class="d-flex flex-column">
                                <!-- <span class="fw-extrabold text-slate-900 small text-uppercase tracking-wider"
                                    style="line-height: 1.2;">
                                    {{ currentUser()?.role }}
                                </span> -->
                                <span class="text-muted truncate-email"
                                    style="font-size: 0.95rem; max-width: 180px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                    {{ currentUser()?.email }}
                                </span>
                            </div>
                            }
                        </div>

                        <div class="ms-3 ps-3 border-start">
                            <button
                                class="btn btn-logout-wide d-flex align-items-center gap-2 border-0 bg-transparent text-danger fw-bold small"
                                (click)="logout()">
                                <i class="bi bi-power fs-5"></i>
                            </button>
                        </div>
                    </div>      
                </div>
            </div>

            <div class="table-container shadow-sm border bg-white rounded-5 overflow-hidden">
                <table class="table table-borderless align-middle mb-0">
                    <thead>
                        <tr class="text-uppercase small text-muted tracking-widest border-bottom">
                            <th class="ps-4 py-4">Student Profile</th>
                            <th>Status / Contact</th>
                            <th>Performance</th>
                            <th class="text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            @for (student of studentList(); track student.id; let i = $index) {
                        <tr class="row-modern border-bottom">
                            <td class="ps-4 py-4">
                                <div class="d-flex align-items-center">
                                    <div class="profile-circle me-3">RS</div>
                                    <div>
                                        <div class="fw-bold text-slate-900">{{student.fullName}} </div>
                                        <div class="text-muted extra-small">  {{ student.email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span
                                    class="badge rounded-pill bg-success-subtle text-success px-3 py-2 small mb-1">Active</span>
                                <div class="text-slate-500 small">{{student.mobileNo}} </div>
                            </td>
                            <td>
                                <div class="d-flex align-items-center gap-3">
                                    <div class="score-pill fw-bold">{{student.average}} %</div>
                                    <div class="mini-chart bg-light rounded-pill overflow-hidden"
                                        style="width: 80px; height: 6px;">
                                        <div class="bar bg-primary" style="width: 82%; height: 100%;"></div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-end pe-4">
                                <div class="action-wrapper d-flex gap-2 justify-content-end">
                                    <button class="btn-action-view rounded-circle border-0" title="View Details" (click)="getStudentById(student)">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                    <button class="btn-action-delete rounded-circle border-0 text-danger"
                                        title="Remove Record" (click)="deleteCompleteRecord(student)">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path
                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                            </path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>

                <div class="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-top">
                    <div class="text-muted small fw-medium">
                        Showing <span class="text-dark fw-bold">1-10</span> of <span class="text-dark">120</span>
                        students
                    </div>
                    <nav>
                        <ul class="pagination-modern d-flex gap-2 list-unstyled m-0">
                            <li><button class="btn-page" disabled>‹</button></li>
                            <li><button class="btn-page active">1</button></li>
                            <li><button class="btn-page">2</button></li>
                            <li><button class="btn-page">3</button></li>
                            <li><button class="btn-page">›</button></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <footer class="mt-auto py-4 px-2 border-top bg-white">
               
            </footer>

        </main>
    </div>
</div>