import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  contador: number = 0;

  constructor(
    private backgroundMode: BackgroundMode, 
    private platform: Platform, 
    private http: HttpClient) {

    this.platform.ready().then(() => {
      this.backgroundMode.enable();

      this.backgroundMode.on('activate').subscribe(() => {
        this.backgroundTask();
        console.log('La aplicación ha entrado en modo background');
      });

      this.platform.pause.subscribe(() => {
        console.log('La aplicación ha sido puesta en pausa');
      });

      this.platform.resume.subscribe(() => {
        console.log('La aplicación ha sido reanudada');
      });

    });
  }

  backgroundTask() {
    setInterval(() => {
        this.contador++;
        console.log("contador: " +this.contador);
        this.http.get('https://jsonplaceholder.typicode.com/posts/1')
          .subscribe(response => {
            console.log("respuesta: " +response);
          });
    }, 5000);
  }
}

