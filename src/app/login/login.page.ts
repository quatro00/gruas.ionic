import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoginRequest } from '../models/auth/login-request.model';
import { LoginResponse } from '../models/auth/login-response.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  darkMode = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,private fb: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private toastController: ToastController
  ) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Campo requerido
      password: ['', Validators.required], // Campo requerido
    });
  }

  ngOnInit() {
    this.checkAppMode();
  }


  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    // const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  goToRecuperarContrasena() {
    this.router.navigate(['/recuperar-contrasena']); // Navega a la página de recuperación de contraseña
  }

  async onLogin() {
    // Muestra el loader
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'circles',
    });
    await loading.present();

    // Crea el objeto de la petición
    const loginRequest: LoginRequest = {
      Username: this.loginForm.value.username, // Cambia por los valores reales del formulario
      Password: this.loginForm.value.password,
    };

    // Llama al servicio de login
    this.authService.Login(loginRequest).subscribe({
      next: async (response: LoginResponse) => {
        localStorage.setItem('ServiciosMC.Token',`Bearer ${response.token}`);
        await loading.dismiss(); // Oculta el loader

        //mandamos a la pagina principal
        this.router.navigate(['/tabs']), { replaceUrl: true };
      },
      error: async (err:any) => {
        //console.error(err.error.errors.error[0]);
        await this.showToast(err.error.errors.error[0]);
        await loading.dismiss(); // Oculta el loader incluso si ocurre un error
      },
    });
  }
  
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'top', // Muestra el mensaje en la parte superior
      color: 'danger', // Color del toast (puede ser "primary", "success", "danger", etc.)
    });
    await toast.present();
  }

}
