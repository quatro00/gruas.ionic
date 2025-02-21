import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, delay, finalize, map, throwError } from 'rxjs';
//import { CookieService } from 'ngx-cookie-service';
//import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ServicesInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private msg: ToastController,
    private toastController:ToastController
  ) { }

  async showToast(message: string, tipo:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'top', // Muestra el mensaje en la parte superior
      color: tipo, // Color del toast (puede ser "primary", "success", "danger", etc.)
    });
    await toast.present();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
      const token = localStorage.getItem('ServiciosMC.Token');
      const headers:any = {};

      if (token) {
        headers['Authorization'] = token;
      }

    const authRequest = request.clone({
      setHeaders: headers
    });

    return next.handle(authRequest).pipe(
      delay(0),
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: any) => {
        console.log('token ',localStorage.getItem('ServiciosMC.Token'));
        console.log('error--->>>', error);
        var tipoError: number = error.status;
        var errorMsg: string = '';
        switch (tipoError) {
          case 401:
            errorMsg = 'Sesion terminada favor de iniciar sesion.';
            //this.authService.logout();
            break;
          case 400:
            errorMsg = error.error.errors.error[0];
            this.showToast(errorMsg,'danger');
            //this.authService.logout();
            break;
          default:
            errorMsg = 'Ocurrio un error inesperado';
            break;
        }

        //this.msg.create.error(errorMsg);
        return throwError(error);
      }),
      finalize(() => {
        //console.log('terminado');
      }));;
  }


}
