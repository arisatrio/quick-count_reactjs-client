import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, doc, where, limit } from "@firebase/firestore";
import { db } from "../../firebase-config";

import { Card, Row, Col } from "antd";
import Chart from 'react-apexcharts';

function HasilSuaraComponent({tps}) {
    const [namaCalon, setNamaCalon] = useState([]);
	const [totalSuara, setTotalSuara] = useState([]);
	const [total, setTotal] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");

    const suaraCollection = collection(db, "hasilSuara");
    const [selectedTPS, setSelectedTPS] = useState("");

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "dataTPS", tps), (doc) => {
            setSelectedTPS(doc.data().id_tps);
        });

        const suara = query(suaraCollection, where('tps_key', '==', tps));
		const unset = onSnapshot(suara, (querySnapshot) => {
			const totalSuaraArray = [];
			const namaCalonArray = [];
			let total = 0;
			querySnapshot.forEach((doc) => {
				let total_suara = doc.data().total_suara;
				let nama_calon = '('+doc.data().calon_key+') '+doc.data().nama_calon;
				total = total + doc.data().total_suara;

				totalSuaraArray.push(total_suara);
				namaCalonArray.push(nama_calon);
			});
			setNamaCalon(namaCalonArray);
			setTotalSuara(totalSuaraArray);
			setTotal(total);
		});

        const getLast = query(suaraCollection, where('tps_key','==',  tps), orderBy('created_at', 'desc'), limit(1));
        const uncheck = onSnapshot(getLast, (querySnapshot) => {
            const res = querySnapshot.docs[0];
            if(res != undefined){
                const data = res.data();
                setLastUpdated(data.created_at.toDate().toLocaleDateString('id-ID')+' '+ data.created_at.toDate().toLocaleTimeString('en-GB'));
            }
        });

    }, []);

    
    const state = {
        options: {
            labels: namaCalon,
            chart: {
                offsetX: -35,
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
        <>
            <Card>
                <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                        <Col xs={24} sm={24}>
                            <span>Total Hasil Suara Sementara</span><h1>{selectedTPS} : <b>{total}</b></h1>
                            <div className="donut">
                                <Chart options={state.options} series={totalSuara} type="pie" width="120%" />
                            </div>
                            <small>Terakhir diperbaharui : <i>{lastUpdated}</i></small>
                        </Col>
                    </Row>
                </div>
            </Card>
        </>
    );
}

export default HasilSuaraComponent;