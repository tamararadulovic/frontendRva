import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Radnik } from 'src/app/models/radnik';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { RadnikService } from 'src/app/services/radnik.service';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit, OnDestroy {

  obrazovanja: Obrazovanje[];
  public flag: number;
  subscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RadnikDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Radnik,
    public radnikService: RadnikService,
    public obrazovanjeService: ObrazovanjeService) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.obrazovanjeService.getAllObrazovanja()
      .subscribe(obrazovanja => {
        this.obrazovanja = obrazovanja;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }

  public add(): void {
    this.radnikService.addRadnik(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno dodat radnik!', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 1500
        });
      }
  }

  public update(): void {
    this.radnikService.updateRadnik(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno modifikovan radnik!', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 1500
        });
      }
  }


  public delete(): void {
    this.radnikService.deleteRadnik(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno obrisan radnik!', 'U redu', {
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


