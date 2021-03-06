import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar, MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';

      const snackBarRef = this.snackBar.open(message, 'Close', config);
      snackBarRef.onAction().subscribe(() => this.snackBar.dismiss());

  }

}
