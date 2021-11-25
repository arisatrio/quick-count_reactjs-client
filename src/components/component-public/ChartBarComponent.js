import { collection, onSnapshot, query, orderBy, limit } from '@firebase/firestore';
import { Card, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import { db } from '../../firebase-config';

export default function ChartBarComponent() {
    const [categories, setCategories] = useState([]);
    const [hasilSuara, setHasilSuara] = useState([]);
    const [createdAt, setCreatedAt] = useState("");
    const calonCollection = collection(db, "calon");
    const suaraCollection = collection(db, "hasilSuara");

    const chart = {
        series: [{
            name: 'Total Suara ',
            data: hasilSuara,
        }],
        options: {
            noData: {
                text: "Data Kosong",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: -50,
                offsetY: 0,
                style: {
                    color: "#8c8c8c",
                    fontSize: '14px',
                }
            },
            chart: {
                height: 350,
                type: 'bar',
            },
            title: {
                text: 'Total Suara Sah Masuk',
                align: 'left'
            },
            colors: ['#449DD1', '#FF4560', '#4CAF50'],
            plotOptions: {
                bar: {
                    columnWidth: '70%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: true
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: categories,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            }
        },  
        toolbar: {
            show: true,
        },
    }

    useEffect(() => {
        const suara = query(calonCollection);
        const unset = onSnapshot(calonCollection, (querySnapshot) => {
            const hasilSuara = [];
            const categories = [];
            querySnapshot.forEach((doc) => {
                let no_urut = '(' + doc.id + ')';
                let nama_calon = doc.data().nama_calon;
                let total_suara = doc.data().total_suara;

                hasilSuara.push(total_suara);
                categories.push([no_urut, nama_calon]);
            });
            setHasilSuara(hasilSuara);
            setCategories(categories);
        });

        const getLast = query(suaraCollection, orderBy('created_at', 'desc'), limit(1));
        const uncheck = onSnapshot(getLast, (querySnapshot) => {
            const res = querySnapshot.docs[0];
            if(res != undefined){
            const data = res.data();

            setCreatedAt(data.created_at.toDate().toLocaleDateString('id-ID')+' '+ data.created_at.toDate().toLocaleTimeString('en-GB'));
            }
        });

    }, []);

    return (
        <Card style={{ marginBottom: '10px' }}>
            <div className="number">
                <Row align="middle" gutter={[24,0]}>
                    <Col xs={24} sm={24}>
                        <div id="chart">
                            <Chart options={chart.options} series={chart.series} type="bar" height={300} />
                        </div>
                    </Col>
                </Row>
                
                <small>Terakhir diperbaharui : <i>{createdAt}</i></small>
            </div>
        </Card>
    );
}
