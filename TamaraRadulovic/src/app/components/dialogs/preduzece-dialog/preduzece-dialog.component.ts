import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit, OnDestroy {

  public flag: number;
  subscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Preduzece,
    public preduzeceService: PreduzeceService) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  public add(): void {
    this.preduzeceService.addPreduzece(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno dodato preduzeće: ' + this.data.naziv, 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 2500
        });
      };
  }

  public update(): void {
    this.preduzeceService.updatePreduzece(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno modifikovano preduzeće: ' + this.data.naziv, 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 2500
        });
      };
  }

  public delete(): void {
    this.preduzeceService.deletePreduzece(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno obrisano preduzeće.', 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 2500
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
