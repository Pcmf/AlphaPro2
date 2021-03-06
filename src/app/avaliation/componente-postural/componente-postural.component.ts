import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-componente-postural',
  templateUrl: './componente-postural.component.html',
  styleUrls: ['./componente-postural.component.scss']
})
export class ComponentePosturalComponent implements OnInit {
  addForm = false;
  student: any = [];
  maxPointer = -1;
  pointer = -1;
  editPointer: number;
  editAv = false;
  oldData: any = [];
  newData: any = [];
  data: string;
  selectedTab = 0;
  locale: string;
  viewPhoto = true;
  private dataPhoto: string;
  // toggle webcam on/off
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = true;
  deviceId: string;
  videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  errors: WebcamInitError[] = [];

  // latest snapshot
  webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  view = '';
  viewTitle = '';
  private foto1: string;
  private foto2: string;
  private foto3: string;
  spinner = false;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  swipeLeft(event) {
    if (this.selectedTab < 3) {
      this.selectedTab++;
    }
  }
  swipeRight(event) {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
  }

  getData() {
    this.spinner = true;
    this.dataService.getData('clients/post/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp.length > 0) {
          this.maxPointer = resp.length;
          this.oldData = resp;
          this.pointer = this.maxPointer - 1;
        } else {
            this.newData.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
            this.pointer = -1;
            this.maxPointer = -1;
        }
        console.log(this.oldData);
        console.log(this.maxPointer);
        this.spinner = false;
      }
    );
  }

  /* abrir nova avaliação */
  addDataForm() {
    this.foto1 = null;
    this.foto2 = null;
    this.foto3 = null;
    this.newData.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.oldData[this.maxPointer - 1].data == this.newData.data) {
      this.newData.data = '';
      this.newData = [];
    }
    this.addForm = true;
  }

  saveDataForm(form) {
    if (form.value.data) {
      this.spinner = true;
      this.dataService.setData('clients/post/' + this.student.id, form.value).subscribe(
        resp => {
          this.pointer = -1;
          this.addForm = false;
          this.spinner = false;
          this.getData();
        }
      );
    } else {
      this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
    }
  }

  executeAction(param, evaluation, editPointer) {
    if (param.operation === 'Delete' && param.execute) {
      this.delete(evaluation);
    }
    if (param.operation === 'Edit' && param.execute) {
      this.openEditForm(evaluation, editPointer);
    }
    if (param.operation === 'Edit' && !param.execute) {
      this.closeEditForm();
    }
    if (param.operation === 'Save' && param.execute) {
      this.saveEditForm();
    }
  }

  openEditForm(evaluation, editPointer) {
    this.newData = evaluation;
    this.editAv = true;
    this.editPointer = editPointer;
  }

  saveEditForm() {
    this.spinner = true;
    this.dataService.setData('clients/post/' + this.student.id, this.newData).subscribe(
      resp => {
        this.spinner = false;
        this.newData = [];
        this.closeEditForm();
        this.getData();
      }
    );
  }

  closeEditForm() {
    this.editAv = false;
    this.editPointer = -1;
  }

  delete(evaluation) {
    this.spinner = true;
    this.dataService.delete('clients/post/' + this.student.id + '/' + evaluation.data).subscribe(
      resp => {
        this.foto1 = null;
        this.foto2 = null;
        this.foto3 = null;
        this.spinner = false;
        this.pointer--;
        this.getData();
      }
    );
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  deleteView(view, data) {
    this.foto1 = null;
    this.foto2 = null;
    this.foto3 = null;
    switch (view) {
      case 'a':
        this.foto1 = 'del';
        break;
      case 'l':
        this.foto2 = 'del';
        break;
      case 'p':
        this.foto3 = 'del';
        break;
    }
    let obj = {};
    obj = {
      data,
      fotoa: this.foto1,
      fotol: this.foto2,
      fotop: this.foto3
    };

    this.spinner = true;
    this.dataService.setData('clients/post/del/' + this.student.id, obj).subscribe(
      resp => {
        this.view = '';
        this.webcamImage = null;
        this.spinner = false;
        this.getData();
      }
    );
  }

  receiveImage(event, view, data) {
    console.log(view);
    this.dataPhoto = data;
    switch (view) {
      case 'a':
        this.foto1 = event;
        break;
      case 'l':
        this.foto2 = event;
        break;
      case 'p':
        this.foto3 = event;

        break;
    }
    if (this.addForm) {
      this.dataPhoto = this.datapipe.transform(Date(), 'yyyy-MM-dd');
      this.newData.fotoa = this.foto1;
      this.newData.fotol = this.foto2;
      this.newData.fotop = this.foto3;
    }
    const obj = {
      data: this.dataPhoto,
      fotoa: this.foto1,
      fotol: this.foto2,
      fotop: this.foto3
    };
    this.spinner = true;
    this.dataService.setData('clients/post/' + this.student.id, obj).subscribe(
      resp => {
        this.view = '';
        this.spinner = false;
        this.getData();
      }
    );
  }


  openTakePhoto(view, data) {
    this.view = view;
    this.dataPhoto = data;
    switch (view) {
      case 'a':
        this.viewTitle = 'Vista Anterior';
        break;
      case 'l':
        this.viewTitle = 'Vista Lateral';
        break;
      case 'p':
        this.viewTitle = 'Vista Posterior';
        break;
      default:
        break;
    }
  }

  savePhoto() {
    switch (this.view) {
      case 'a':
        this.foto1 = this.webcamImage.imageAsDataUrl;
        break;
      case 'l':
        this.foto2 = this.webcamImage.imageAsDataUrl;
        break;
      case 'p':
        this.foto3 = this.webcamImage.imageAsDataUrl;
        break;
    }
    if (this.addForm) {
      this.dataPhoto = this.datapipe.transform(Date(), 'yyyy-MM-dd');
      this.newData.fotoa = this.foto1;
      this.newData.fotol = this.foto2;
      this.newData.fotop = this.foto3;
    }
    const obj = {
      data: this.dataPhoto,
      fotoa: this.foto1,
      fotol: this.foto2,
      fotop: this.foto3
    };

    this.spinner = true;
    this.dataService.setData('clients/post/' + this.student.id, obj).subscribe(
      resp => {
        this.spinner = false;
        this.view = '';
        this.webcamImage = null;
        this.getData();
      }
    );
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    //  console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    //  console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  showPhoto(view, data, photo) {
    const dialogRef = this.dialog.open(ShowPhotoDialog, {
      /* width: '360px', */
      data: { view, data, photo }
    });
  }


  goBack() {
    this.location.back();
  }


  closeInputs() {
    this.newData = [];
    this.addForm = false;
    this.getData();
  }

  openDialog(type): void {
    this.dialogService.openHelp(type);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

}


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-show-photo',
  templateUrl: 'dialog-show-photo.html',
})
// tslint:disable-next-line: component-class-suffix
export class ShowPhotoDialog {

  constructor(
    public dialogRef: MatDialogRef<ShowPhotoDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
