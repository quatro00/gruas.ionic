import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
  standalone: false,
})
export class RecuperarContrasenaPage implements OnInit {
  darkMode = false;
  form: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.form = this.fb.group({
          email: ['', Validators.required], // Campo requerido
        });
  }

  async showToast(message: string, tipo:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'top', // Muestra el mensaje en la parte superior
      color: tipo, // Color del toast (puede ser "primary", "success", "danger", etc.)
    });
    await toast.present();
  }

 async recuperarPassword(){
    const loading = await this.loadingController.create({
      message: 'Espere...',
      spinner: 'circles',
    });

    // Crea el objeto de la petición
        const loginRequest: any = {
          Email: this.form.value.email
        };

    await loading.present();

    this.authService.RestablecerPassword(loginRequest).subscribe({
          next: async (response: any) => {
            //localStorage.setItem('ServiciosMC.Token',`Bearer ${response.token}`);
            await loading.dismiss(); // Oculta el loader
            await this.showToast('Favor de revisar tu correo electronico', 'success');
            //mandamos a la pagina principal
            //this.router.navigate(['/tabs']), { replaceUrl: true };
          },
          error: async (err:any) => {
            //console.error(err.error.errors.error[0]);
            await this.showToast(err.error.errors.error[0], 'danger');
            await loading.dismiss(); // Oculta el loader incluso si ocurre un error
          },
          complete: () => {
            loading.dismiss();
            //this.isLoading = false;
            //this.showContent = true;
          },
        });

  }
  goToBack(){
    this.location.back();
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

}
