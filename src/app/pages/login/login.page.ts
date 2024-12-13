import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonNote, IonItem, IonButton, IonInput} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonInput, IonButton, IonItem, IonNote, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginPage implements OnInit {
  	credentials!: FormGroup;
	isIOS!: boolean;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private platform: Platform
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		this.isIOS = this.platform.is('ios');
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});

	}

	async login() {

		console.log(this.credentials);
		

		const user = await this.authService.login(this.credentials.value);

		if (user) {
			this.router.navigateByUrl('/', { replaceUrl: true });
		} else {
			this.showAlert('Login failed', 'Please try again!');
		}
	}

	async showAlert(header: string, message: string) {
		console.log('OK', header, message);
	}

	

}
