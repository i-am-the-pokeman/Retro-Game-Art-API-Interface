import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AlertDialogData {
  message: string;
  title?: string;
  iconName?: string;
}

@Component({
  selector: 'alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.sass']
})
export class AlertDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}
}
