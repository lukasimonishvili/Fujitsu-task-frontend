import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ConfirmEmail } from './confirm-email';

describe('ConfirmEmail', () => {
  let component: ConfirmEmail;
  let fixture: ComponentFixture<ConfirmEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({ token: 'test-token' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmEmail);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
