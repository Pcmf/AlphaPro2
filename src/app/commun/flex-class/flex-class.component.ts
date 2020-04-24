import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flex-class',
  templateUrl: './flex-class.component.html',
  styleUrls: ['./flex-class.component.scss']
})
export class FlexClassComponent implements OnInit {
  @Input() inFlexClass: string;
  flexClass: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.inFlexClass);
    switch (this.inFlexClass) {
      case '1':
        this.flexClass = 'Fraca';
        break;
      case '2':
        this.flexClass = 'Média';
        break;
      case '3':
        this.flexClass = 'Boa';
        break;
      case '4':
        this.flexClass = 'Excelente';
        break;
      default:
        this.flexClass = '-';
        break;
    }
  }

}
