import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-flex-class',
  templateUrl: './flex-class.component.html',
  styleUrls: ['./flex-class.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexClassComponent implements OnInit {
  @Input() inFlexClass: Observable <number>;
  flexClass: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.inFlexClass);
    switch (+this.inFlexClass) {
      case 1:
        this.flexClass = '1-Fraca';
        break;
      case 2:
        this.flexClass = '2-Média';
        break;
      case 3:
        this.flexClass = '3-Boa';
        break;
      case 4:
        this.flexClass = '4-Excelente';
        break;
      default:
        this.flexClass = '-';
        break;
    }
  }

}
