import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(private dialogRef:MatDialogRef<DialogComponent> ,@Inject(MAT_DIALOG_DATA) public data:any ){}

  ngOnInit():void
  {
    if (this.data){
      console.log("data", this.data);
    } 
  }
  onDelete():void
  {
    this.dialogRef.close(true);
  }
}
