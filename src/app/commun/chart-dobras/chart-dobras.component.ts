import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-dobras',
  templateUrl: './chart-dobras.component.html',
  styleUrls: ['./chart-dobras.component.scss']
})
export class ChartDobrasComponent implements OnInit {

    // graphics
    single: any[];
    view: any[] = [300, 300];

    // options
    gradient = true;
    showLegend = true;
    showLabels = false;
    isDoughnut = false;
    legendPosition = 'top';

    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1010FF', '#BF00FF', '#00FFFF']
    };
    @Input() chart1: any[];


  ngOnInit(): void {
    setTimeout(() => {
      const single = this.chart1;
      Object.assign(this, { single });
    }, 700);

  }


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
