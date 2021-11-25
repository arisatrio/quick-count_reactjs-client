import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class GaugeChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [76],
          options: {
            chart: {
              type: 'radialBar',
              sparkline: {
                enabled: true
              }
            },
            title: {
                    text: 'Persentase Suara Sah Masuk',
                    align: 'left'
                },
            plotOptions: {
              radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                  background: "#e7e7e7",
                  strokeWidth: '97%',
                  margin: 5, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    color: '#999',
                    opacity: 1,
                    blur: 2
                  }
                },
                dataLabels: {
                  name: {
                    show: false
                  },
                  value: {
                    offsetY: -2,
                    fontSize: '22px'
                  }
                }
              }
            },
            grid: {
              padding: {
                top: -10
              }
            },
          },
        
        
        };
      }

    

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="radialBar" />
            </div>
        );
    }
}
export default GaugeChart;