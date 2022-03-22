jest.mock('app/core/auth/account.service');

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

import { HomeComponent } from './home.component';

describe('Home Component', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAccountService: AccountService;
  let mockRouter: Router;
  const account: Account = {
    activated: true,
    authorities: [],
    email: '',
    firstName: null,
    langKey: '',
    lastName: null,
    login: 'login',
    imageUrl: null,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
        declarations: [HomeComponent],
        providers: [AccountService],
      })
        .overrideTemplate(HomeComponent, '')
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
    mockAccountService = TestBed.inject(AccountService);
    mockAccountService.identity = jest.fn(() => of(null));
    mockAccountService.getAuthenticationState = jest.fn(() => of(null));

    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
  });

  describe('login', () => {
    it('Should navigate to /login on login', () => {
      // WHEN
      comp.login();

      // THEN
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

});
