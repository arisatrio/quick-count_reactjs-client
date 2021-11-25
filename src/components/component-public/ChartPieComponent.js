import React, {useEffect, useState} from 'react'
import { Card, Row, Col } from "antd";
import Chart from 'react-apexcharts';
import { db } from "../../firebase-config";
import { collection, onSnapshot, query, orderBy, limit } from '@firebase/firestore';

export default function ChartPieComponent() {
    const [hasilSuara, setHasilSuara] = useState([]);
    const [namaCalon, setNamaCalon] = useState([]);
    const [createdAt, setCreatedAt] = useState("");

    const calonCollection = collection(db, "calon");
    const suaraCollection = collection(db, "hasilSuara");

    useEffect(() => {
        const suara = query(calonCollection);
        const unset = onSnapshot(suara, (querySnapshot) => {
            let hasilSuaraArray = [];
            let namaCalonArray = [];
            querySnapshot.forEach((doc) => {
                let total_suara = doc.data().total_suara;
                let nama_calon = doc.data().nama_calon;

                hasilSuaraArray.push(total_suara);
                namaCalonArray.push(nama_calon);
            });
            setHasilSuara(hasilSuaraArray);
            setNamaCalon(namaCalonArray);
        });

        const getLast = query(suaraCollection, orderBy('created_at', 'desc'), limit(1));
        const unsub = onSnapshot(getLast, (querySnapshot) => {
            let res = querySnapshot.docs[0];
            if(res != undefined){
                let data = res.data();

                setCreatedAt(data.created_at.toDate().toLocaleDateString('id-ID') + ' ' + data.created_at.toDate().toLocaleTimeString('en-GB'));
            }

        });
    });
    
    const state = {
        options: {
            labels: namaCalon,
            chart: {
                offsetX: -30,
            },
            title: {
                text: 'Total Suara Sah Masuk',
                align: 'left',
                offsetX: 30,
            },
            colors: ['#449DD1', '#FF4560', '#4CAF50'],
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
            tooltip: {
                enabled: true,
                enabledOnSeries: undefined,
                shared: true,
                followCursor: false,
                intersect: false,
                inverseOrder: false,
                custom: undefined,
                fillSeriesColor: false,
                theme: "light",
                style: {
                    fontSize: '12px',
                    color: "#fff",
                },
                onDatasetHover: {
                    highlightDataSeries: true,
                },
                marker: {
                    show: true,
                },
                fixed: {
                    enabled: false,
                    position: 'topRight',
                    offsetX: 0,
                    offsetY: 0,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    return val.toFixed(2) + '%'
                },
                textAnchor: 'middle',
                distributed: false,
                offsetX: 0,
                offsetY: 0,
                style: {
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: undefined
                },
                background: {
                  enabled: true,
                  foreColor: '#fff',
                  padding: 4,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: '#fff',
                  opacity: 0.9,
                  dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                  }
                },
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            }
        },
    };

    return (
        <Card style={{ marginBottom: '10px' }}>
            <div className="number">
                <Row align="middle" gutter={[24,0]}>
                    <Col xs={24} sm={24}>
                        <div id="chart">
                            <Chart options={state.options} series={hasilSuara} type="pie" width="120%"></Chart>
                        </div>
                    </Col>
                </Row>
                <small>Terakhir diperbaharui : <i>{createdAt}</i></small>
            </div>
        </Card>
    );
}