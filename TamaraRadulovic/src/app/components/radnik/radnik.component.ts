import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Radnik } from 'src/app/models/radnik';
import { Sektor } from 'src/app/models/sektor';
import { RadnikService } from 'src/app/services/radnik.service';
import { RadnikDialogComponent } from '../dialogs/radnik-dialog/radnik-dialog.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'obrazovanje', 'sektor', 'actions'];
  dataSource: MatTableDataSource<Radnik>;
  subscription: Subscription;

  @Input() childSelektovaniSektor: Sektor;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private radnikService: RadnikService,
    private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    //console.log("selektovaniSektor: " + this.selektovaniSektor);
    this.loadData();
  }

  ngOnChanges(): void {
    if (this.childSelektovaniSektor.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.radnikService.getRadnici(this.childSelektovaniSektor.id)
      .subscribe(data => {
        console.log("Dobijeni radnici:" + data);
        this.dataSource = new MatTableDataSource(data);
        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return key === 'obrazovanje' ? currentTerm + data.obrazovanje.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data: any, property) => {
          switch (property) {
            case 'obrazovanje': return data.obrazovanje.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: number, obrazovanje?: Obrazovanje, sektor?: Sektor) {
    const dialogRef = this.dialog.open(RadnikDialogComponent,
      { data: { id, ime, prezime, brojLk, obrazovanje, sektor } });
    dialogRef.componentInstance.flag = flag;

    if (flag === 1) {
      dialogRef.componentInstance.data.sektor = this.childSelektovaniSektor;
    }
    dialogRef.afterClosed().subscribe(result => {
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
