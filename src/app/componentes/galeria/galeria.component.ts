import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { GaleriaService } from 'src/app/services/galeria.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  fotos: string[] = [];
  currentIndex: number = 0;
  private galeriaSubscription: Subscription;
  galeriaAbierta: boolean = false;

  constructor(private galeriaService: GaleriaService) {}

  ngOnInit(): void {
    this.galeriaSubscription = this.galeriaService.galeria$.subscribe(data => {
      if (data) {
        this.fotos = data.fotos;
        this.currentIndex = data.index;
      }
    });

    this.galeriaService.galeriaAbierta$.subscribe(abierta => {
      this.galeriaAbierta = abierta;
    });
  }

  ngOnDestroy(): void {
    this.galeriaSubscription.unsubscribe();
  }

  cerrarGaleria(): void {
    this.galeriaService.cerrarGaleria();
  }

  siguiente(): void {
    this.currentIndex = (this.currentIndex + 1) % this.fotos.length;
  }

  anterior(): void {
    this.currentIndex = (this.currentIndex - 1 + this.fotos.length) % this.fotos.length;
  }
}
