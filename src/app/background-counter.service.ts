import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Injectable({
  providedIn: 'root'
})
export class BackgroundCounterService {
  private count = new BehaviorSubject<number>(0);
  currentCount = this.count.asObservable();

  constructor(private backgroundMode: BackgroundMode) {
    this.backgroundMode.enable(); // Activar el modo background

    // Incrementar el contador cada segundo cuando la aplicación esté en segundo plano
    this.backgroundMode.on('activate').subscribe(() => {
      setInterval(() => {
        this.count.next(this.count.value + 1);
        console.log("esta funcionando");
      }, 1000);
    });
  }
}

