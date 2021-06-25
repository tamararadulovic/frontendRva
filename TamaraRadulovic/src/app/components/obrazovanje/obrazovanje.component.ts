import { Obrazovanje } from './../../models/obrazovanje';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ObrazovanjeDialogComponent } from '../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'stepenStrucneSpreme', 'opis', 'actions'];
  dataSource: MatTableDataSource<Obrazovanje>;
  subscription: Subscription;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private obrazovanjeService: ObrazovanjeService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {
    this.subscription = this.obrazovanjeService.getAllObrazovanja()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, naziv?: string, stepenStrucneSpreme?: string, opis?: string) {
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent, { data: { id, naziv, stepenStrucneSpreme, opis } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 1) {
          this.loadData();
        }
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
