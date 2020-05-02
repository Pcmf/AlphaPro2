import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-dialog-help',
  templateUrl: './dialog-help.component.html',
  styleUrls: ['./dialog-help.component.scss']
})
export class DialogHelpComponent implements OnInit {
  help: any = [];
  constructor(
                public dialogRef: MatDialogRef<DialogHelpComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private dataService: DataService
    ) {
    console.log(data);
    this.dataService.getData('help/' + data).subscribe(
      resp => {
        if (resp[0]) {
          this.help = resp[0];
        } else {
          this.help.info = 'Não existe informação!.';
        }
      }
    );
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
