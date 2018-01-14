import { Component } from '@angular/core';
import {SdkService} from './sdk.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  typeBar = 'bar';
  typeLine = 'line';
  options: any = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        },
        barThickness: 100,
        categorySpacing: 1

      }]

    }
  };

  barChartDataCPU = {
    labels: ['CPU USAGE IN PERCENTAGE'],
    datasets: [{
      backgroundColor: [],
      label: 'CPU',
      data: [0, 0],
      borderWidth: 1
    }]
  };

  barChartDataRAM = {
    labels: ['RAM USAGE IN PERCENTAGE'],
    datasets: [{
      backgroundColor: [],
      label: 'RAM',
      data: [0, 0],
      borderWidth: 1
    }]
  };

  lineChartDataCPU = {
    labels: [],
    datasets: [{
      backgroundColor: [],
      label: 'CPU USAGE',
      data: [0, 0],
      borderWidth: 1
    }]
  };

  lineChartDataRAM = {
    labels: [],
    datasets: [{
      backgroundColor: [],
      label: 'RAM USAGE',
      data: [0, 0],
      borderWidth: 1
    }]
  };

  cpuUsageData = [];
  ramUsageData = [];
  interval = 5;

  constructor(private networkService: SdkService) {
  }


  getCPUUtilization() {
    console.log(this.interval);
    const scb = (response) => {
      if (response && response.data) {
        this.barChartDataCPU = {
          labels: ['System Usage'],
          datasets: [
            {
              backgroundColor: ['#2ECC71'],
              label: 'CPU',
              data: [response.data.cpusUsageOverall],
              borderWidth: 1
            }
          ]
        };

        this.barChartDataRAM = {
          labels: ['System Usage'],
          datasets: [
            {
              backgroundColor: ['#2E86C1'],
              label: 'RAM',
              data: [response.data.ramUsageOverall],
              borderWidth: 1
            }
          ]
        };

        if (this.cpuUsageData.length >= 7) {
          this.cpuUsageData.shift();
        }
        if (this.ramUsageData.length >= 7) {
          this.ramUsageData.shift();
        }
        this.cpuUsageData.push(response.data.cpusUsageOverall);
        this.ramUsageData.push(response.data.ramUsageOverall);

        this.lineChartDataCPU = {
          labels: [0, 5, 10, 15, 20, 25, 30],
          datasets: [
            {
              backgroundColor: ['#2ECC71'],
              label: 'CPU',
              data: this.cpuUsageData,
              borderWidth: 1
            }
          ]
        };

        this.lineChartDataRAM = {
          labels: [0, 5, 10, 15, 20, 25, 30],
          datasets: [
            {
              backgroundColor: ['#2E86C1'],
              label: 'RAM',
              data: this.ramUsageData,
              borderWidth: 1
            }
          ]
        };


      }

    };

    const fcb = (response) => {
      console.log(response);
    };

    setTimeout(() => {
      this.getCPUUtilization();
    }, this.interval * 1000);

    this.networkService.getCPUUtilization(scb, fcb);
  }

  setIntervalForDataRefresh(interval) {
    this.interval = interval;
  }


  ngOnInit() {
    this.getCPUUtilization();
  }
}
