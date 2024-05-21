import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { MembersService } from '@app/services/members/members.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-members',
  standalone:true,
  imports:[
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MembersService],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.less']
})
export class MembersComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    rank: new FormControl(''),
    designation: new FormControl(''),
    organization: new FormControl(''),
    placeOfBirth: new FormControl(''),
    currentLocation: new FormControl(''),
    skills: new FormControl(''),
    weapons: new FormControl(''),
    devilFruits: new FormControl(''),
    bounty: new FormControl('')
  });
  public loading$ = new BehaviorSubject<boolean>(false);
  public memberResponseReturned$ = new BehaviorSubject<boolean>(false);
  public errorMessage$ = new BehaviorSubject<string>('');
  public memberResponse$ = new BehaviorSubject<HttpResponse<null>>(new HttpResponse<null>);
  submitted = false;
  
  constructor(
    private service: MembersService,
    private formBuilder: FormBuilder
  ) {

    this.loading$.next(false);
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required
          ]
        ],
        rank: [
          '',
          [
            Validators.required
          ]
        ],
        designation: [
          '',
          [
            Validators.required
          ]
        ],
        organization: [
          '',
          [
            Validators.required
          ]
        ],
        placeOfBirth: [
          '',
          [
            Validators.required
          ]
        ],
        currentLocation: [
          '',
          [
            Validators.required
          ]
        ],
        skills: [
          '',
          [
            Validators.required
          ]
        ],
        weapons: [
          '',
          [
            Validators.required
          ]
        ],
        devilFruits: [
          '',
          [
            Validators.required
          ]
        ],
        bounty: [
          '',
          [
            Validators.required
          ]
        ]
      })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
      this.loading$.next(true);
      this.memberResponseReturned$.next(false);
      this.errorMessage$.next("");
      this.service
        .addMember(this.f['name'].getRawValue(), this.f['rank'].getRawValue(), this.f['designation'].getRawValue(),
          this.f['organization'].getRawValue(), this.f['placeOfBirth'].getRawValue(), this.f['currentLocation'].getRawValue(),
          this.f['skills'].getRawValue(), this.f['weapons'].getRawValue(), this.f['devilFruits'].getRawValue(),
          this.f['bounty'].getRawValue())
        .pipe(
          map((patentResponse: HttpResponse<null>) => this.memberResponse$.next(patentResponse)
          ),
          catchError((error: string) => {
            throw error;
          })
        )
        .subscribe({
          error: (error) => {
            this.errorMessage$.next(error);
            this.loading$.next(false);
          },
          complete: () => {
            this.loading$.next(false);
            if (this.memberResponse$.getValue().status == 201) {
              this.memberResponseReturned$.next(true);
            }
          },
        });
    }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
