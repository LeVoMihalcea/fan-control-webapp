import {Component, Input, OnInit} from '@angular/core';
import {TemperatureService} from '../service/temperature.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {

  @Input()
  public hours: any;

  constructor(private tempService: TemperatureService) {
  }

  graphData: any;
  options: any;
  currentTemperature: any;
  temperatures: any;


  ngOnInit(): void {
    this.applyDarkTheme();

    this.tempService.getCurrentTemperature().subscribe((data) => {
      this.currentTemperature = data.temperature;
    });

    this.tempService.getTemperatureQueue().subscribe((data) => {
      this.temperatures = data.temperature_queue;
      this.setGraphData();
    });
  }

  private setGraphData(): void {
    this.graphData = {
      labels: this.getTimestampLabels(),
      datasets: [
        {
          label: 'Pi Temperatures in the last ' + this.hours + ' hour(s)',
          data: this.getFilteredTemperatures(),
          fill: false,
          borderColor: '#42A5F5'
        },
      ]
    };
  }

  applyDarkTheme(): void {
    this.options = {
      legend: {
        labels: {
          fontColor: '#ebedef'
        },
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#ebedef'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#ebedef',
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }]
      }
    };
  }

  private getFilteredTemperatures(): any[] {
    const filteredTemperatures: any[] = [];
    const step = this.getStepBasedOnHours();

    for (let i = this.temperatures.length - 60 * this.hours; i <= this.temperatures.length; i += step) {
      if (this.temperatures[i]) {
        filteredTemperatures.push(this.temperatures[i][0]);
      }
    }
    const filterdTempLength = filteredTemperatures.length;
    for (let i = 0; i < this.getTimestampLabels().length - filterdTempLength; i++){
      filteredTemperatures.unshift(null);
    }
    console.log(filteredTemperatures);
    return filteredTemperatures;
  }

  private getTimestampLabels(): string[] {
    const timestampLabels: string[] = [];
    const time = new Date();
    const step = this.getStepBasedOnHours();


    for (let i = this.temperatures.length - 60 * this.hours; i <= this.temperatures.length; i += step) {
      timestampLabels.push(time.toLocaleTimeString());
      time.setMinutes(time.getMinutes() - step);
    }

    return timestampLabels.reverse();
  }

  private getStepBasedOnHours(): number {
    switch (this.hours) {
      case 1: {
        return 1;
      }
      case 6: {
        return 3;
      }
      case 24: {
        return 8;
      }
    }
    return 0;
  }
}
