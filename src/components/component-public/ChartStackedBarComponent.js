import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy, limit } from '@firebase/firestore';
import { db } from '../../firebase-config';
import { Card, Row, Col } from "antd";
import Chart from 'react-apexcharts';

export default function ChartStackedBarComponent(){
    const [dataTps, setDataTps] = useState([]);
    const [dataSuara, setDataSuara] = useState([]);
    const [createdAt, setCreatedAt] = useState("");

    const tpsCollection = collection(db, "dataTPS");
    const suaraCollection = collection(db, "hasilSuara");
    const suaraTpsCollection = collection(db, "hasilSuaraTPS");

    useEffect(() => {
        const suara = query(tpsCollection);
        const unset = onSnapshot(suara, (querySnapshot) => {
            const tpsArray = [];
            querySnapshot.forEach((doc) => {
                let tps_key = doc.data().id_tps;

                tpsArray.push(tps_key);
            });
            setDataTps(tpsArray);
        });

        const getSuara = query(suaraCollection, orderBy('calon_key', 'asc'));
        const unfol = onSnapshot(getSuara, (querySnapshot) => {
            const calonArray = [];
            const suaraArray = []
            querySnapshot.forEach((doc) => {
                let tps = doc.data().tps_key;
                let name = doc.data().nama_calon;
                let total_suara = doc.data().total_suara;

                suaraArray.push({tps, name, total_suara});
            });
            setDataSuara(suaraArray);
        });

        const getLast = query(suaraCollection, orderBy('created_at', 'desc'), limit(1));
        const uncheck = onSnapshot(getLast, (querySnapshot) => {
            const res = querySnapshot.docs[0];
            if(res != undefined){
            const data = res.data();

            setCreatedAt(data.created_at.toDate().toLocaleDateString('id-ID')+' '+ data.created_at.toDate().toLocaleTimeString('en-GB'));
            }
        });

    });

    const totalSuara = dataSuara.reduce((obj, curr) => {
        if(!obj[curr.name]){
            obj[curr.name] = []
        }

        obj[curr.name][dataTps.indexOf(curr.tps)] = parseInt(curr.total_suara);
        return obj;
    }, {});

    const series = Object.entries(totalSuara).map(([name, dataArray]) => {
        return {
            name: name,
            data: dataTps.map((tps, tpsIndex) => {
                if(!dataArray[tpsIndex]){
                    return 0;
                } else {
                    return dataArray[tpsIndex];
                }
            })
            
        }
    });

    const chart = {
        series: series,
        options: {
            chart: {
                type: 'bar',
                stacked: true,
            },
            colors: [
                '#449DD1', '#FF4560', '#4CAF50', '#546E7A'
            ],
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '70%',
                },
            },
            dataLabels: {
                formatter: function(val, opt) {
                  return val !== 0 ? val : ''
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            title: {
                text: 'Total Suara Setiap TPS'
            },
            xaxis: {
                categories: dataTps,
            },
            yaxis: {
                title: {
                    text: undefined
                },
            },
            fill: {
                opacity: 1
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 10
            }
        },    
        toolbar: {
            show: true,
        },
    };

    return (
        <Card style={{ marginBottom: '10px' }}>
            <div className="number">
                <Row align="middle" gutter={[24,0]}>
                    <Col xs={24} sm={24}>
                        <div id="chart">
                            <Chart options={chart.options} series={chart.series} type="bar" width="100%" height="650px"></Chart>
                        </div>
                    </Col>
                </Row>
                <small>Terakhir diperbaharui : <i>{createdAt}</i></small>
            </div>
        </Card>
    );
}