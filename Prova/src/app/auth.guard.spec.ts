import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard'; 
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: { isLoggedIn: () => true } } // Modificato il mock qui
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when authenticated', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true); // Assicurati di spiare il metodo corretto
    expect(guard.canActivate()).toBe(true);
  });

  it('should redirect when not authenticated', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false); // Assicurati di spiare il metodo corretto
    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
