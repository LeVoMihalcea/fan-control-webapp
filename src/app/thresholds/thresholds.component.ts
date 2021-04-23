import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TemperatureService} from '../service/temperature.service';
import {Thresholds} from '../domain/Thresholds';

@Component({
  selector: 'app-thresholds',
  templateUrl: './thresholds.component.html',
  styleUrls: ['./thresholds.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ThresholdsComponent implements OnInit {

  constructor(private tempService: TemperatureService) {
    this.thresholds = new Thresholds(0, 0);
    this.silentMode = false;
  }

  customThresholdCardStyle = {'font-size': '21px', padding: 0, margin: 0};
  currentTemperature: any;
  public thresholds: Thresholds;
  customTemperatureCardStyle = {'font-size': '42px'};
  silentMode: boolean;

  ngOnInit(): void {
    this.tempService.getCurrentTemperature().subscribe((data) => {
      this.currentTemperature = data.temperature;
    });

    this.tempService.getThresholds().subscribe((data) => {
      this.thresholds = new Thresholds(data.high_threshold, data.low_threshold);
    });

    this.tempService.getSilentMode().subscribe((data) => {
      this.silentMode = data.silent_mode;
    });
  }

  public sendThresholds(highThreshold: string, lowThreshold: string): void {
    const highThresholdNumber = highThreshold !== '' ? parseInt(highThreshold, 10) : null;
    const lowThresholdNumber = lowThreshold !== '' ? parseInt(lowThreshold, 10) : null;

    console.log(highThresholdNumber, lowThresholdNumber);

    if (highThresholdNumber && lowThresholdNumber) {
      this.tempService.setThresholds({high_threshold: highThresholdNumber, low_threshold: lowThresholdNumber})
        .subscribe();
    } else if (highThresholdNumber) {
      this.tempService.setThresholds({high_threshold: highThresholdNumber})
        .subscribe();
    } else if (lowThresholdNumber) {
      this.tempService.setThresholds({low_threshold: lowThresholdNumber})
        .subscribe();
    }
  }

  callBoost(): void {
    this.tempService.callBoost().subscribe();
  }
}
