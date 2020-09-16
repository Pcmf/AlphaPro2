import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
  // options
  gradient = true;
  showLegend = true;
  showLabels = false;
  isDoughnut = false;
  legendTitle = 'Legenda';
  legendPosition = 'top';
  view: any[] = [250, 250];
  colorScheme = {
    domain: ['#3778C2', '#E12B38', '#3EB650', '#F4ABAA', '#1010FF', '#BF00FF', '#00FFFF']
  };

  @Input() values: any[];
  constructor() { }

  ngOnInit(): void {
  }

}
