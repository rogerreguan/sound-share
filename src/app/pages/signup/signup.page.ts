import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonNote, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { IProfile } from 'src/model/interfaces';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonNote, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
  credentials!: FormGroup;
  user!: IProfile;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private profileService: ProfileService
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	get username() {
			return this.credentials.get('username');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
      		username: ['', [Validators.required, Validators.minLength(5)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			//password2: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	async register() {

		const user = await this.authService.register(this.credentials.value);

		if (user) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					const up : IProfile = {
						id: user.uid,
						image: '',
						username: this.credentials.get('username')!.value
					}
					this.profileService.createUserProfile(up);
					console.log("userProfile creado.");
				} else {
				  console.log('No hay un usuario autenticado');
				}
			  });
			this.router.navigateByUrl('/', { replaceUrl: true });
		} else {
			this.showAlert('Registration failed', 'Please try again!');
		}
	}

	async showAlert(header: string, message: string) {
		console.log('OK', header, message);
	}

  

}
