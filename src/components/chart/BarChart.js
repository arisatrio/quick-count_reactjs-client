import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
            series: [{
                data: [2100, 2112, 910]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                },
                title: {
                    text: 'Total Suara Sah Masuk',
                    align: 'left'
                },
                theme: {
                    palette: 'palette1'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: [
                        ['01', 'Calon 1'],
                        ['02', 'Calon 2'],
                        ['03', 'Calon 3'],
                    ],
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            },
        };
    }
    
    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        );
    }
}

export default BarChart;