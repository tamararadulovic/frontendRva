import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Preduzece } from 'src/app/models/preduzece';
import { Sektor } from 'src/app/models/sektor';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { SektorService } from 'src/app/services/sektor.service';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {

  preduzeca: Preduzece[];
  public flag: number;
  preduzeceSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SektorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sektor,
    public sektorService: SektorService,
    public preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.preduzeceSubscription = this.preduzeceService.getAllPreduzeca()
      .subscribe(preduzeca => {
        this.preduzeca = preduzeca
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  onDestroy() {
    this.preduzeceSubscription.unsubscribe();
  }

  compareTo(a: any, b: any) {
    return a.id == b.id;
  }

  public add(): void {
    this.sektorService.addSektor(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno dodat sektor: ' + this.data.naziv, 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 1500
        });
      };
  }

  public update(): void {
    this.sektorService.updateSektor(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno modifikovan sektor: ' + this.data.naziv, 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 1500
        });
      };
  }

  public delete(): void {
    this.sektorService.deleteSektor(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno obrisan sektor.', 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 1500
        });
      };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena!', 'U redu', {
      duration: 1000
    });
  }

}
