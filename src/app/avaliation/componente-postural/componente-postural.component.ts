import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-componente-postural',
  templateUrl: './componente-postural.component.html',
  styleUrls: ['./componente-postural.component.scss']
})
export class ComponentePosturalComponent implements OnInit {
  constructor(private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private menuService: MenuService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.studentId = this.actRoute.snapshot.params.id;
    this.getData();
  }
  addForm = false;
  studentId: number;
  maxPointer = -1;
  pointer = -1;
  oldData: any = [];
  newData: any = [];
  data: string;
  selectedTab = 0;

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  view = '';
  viewTitle = '';
  private foto1: string;
  private foto2: string;
  private foto3: string;

  swipeLeft(event) {
    if (this.selectedTab < 3) {
      this.selectedTab++;
      console.log(this.selectedTab);
    }


  }
  swipeRight(event) {
    if (this.selectedTab > 0) {
      this.selectedTab--;
      console.log(this.selectedTab);
    }


  }

  getData() {
    this.dataService.getData('clients/post/' + this.studentId).subscribe(
      (resp: any[]) => {
        this.maxPointer = resp.length;
        if (this.maxPointer > 0) {
          this.oldData = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newData.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  openTakePhoto(view) {
    this.view = view;
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
    const obj = {
      data: this.datapipe.transform(Date(), 'yyyy-MM-dd'),
      fotoa: this.foto1,
      fotol: this.foto2,
      fotop: this.foto3
    };

    //  console.table(this.newData);
    this.dataService.setData('clients/post/' + this.studentId, obj).subscribe(
      resp => {
        console.log(resp);
        this.getData();
        this.view = '';
        this.webcamImage = null;
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


  goBack() {
    this.location.back();
  }

  addDataForm() {
    this.newData.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.addForm = true;
  }

  saveDataForm(form) {
    //  console.table(form.value);
    this.dataService.setData('clients/post/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addForm = false;
  }

  closeInputs() {
    this.newData = [];
    this.addForm = false;
  }

  openDialog(type): void {
    const dialogRef = this.dialog.open(DialogPosturalHelp, {
      width: '250px',
      data: { type }
    });
  }


}

/* HELP DIALOG  */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-postural-help',
  templateUrl: 'dialog-postural-help.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogPosturalHelp {
  help: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogPosturalHelp>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dataService: DataService
  ) {
    this.dataService.getData('help/' + data.type).subscribe(
      resp => {
        if (resp[0]) {
          this.help = resp[0];
        } else {
          this.help.info = 'Não existe informação!.';
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
