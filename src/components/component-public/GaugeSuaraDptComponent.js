import React, {useState, useEffect} from 'react'
import { Card, Row, Col } from 'antd';
import Chart from 'react-apexcharts'
import { db } from '../../firebase-config';
import { collection, onSnapshot, orderBy, query, limit } from "@firebase/firestore";

export default function GaugeSuaraDptComponent() {
    const [totalDpt, setTotalDpt] = useState("");
    const [totalSuara, setTotalSuara] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    const suaraCollection = collection(db, "hasilSuara");
    const totalDPTcollection = collection(db, "totalDPT");

    useEffect(() => {
        const getTotalDpt = query(totalDPTcollection, orderBy('created_at', 'desc'), limit(1));
        const unfol = onSnapshot(getTotalDpt, (querySnapshot) => {
            const res = querySnapshot.docs[0];
            const data = res.data();

            setTotalDpt(data);
        });

        const getAllSuara = query(suaraCollection);
        const unsub = onSnapshot(getAllSuara, (querySnapshot) => {
            let total = 0;
            querySnapshot.forEach((doc) => {
                total = total + doc.data().total_suara;
            });
            setTotalSuara(total);
        });

        const getLast = query(suaraCollection, orderBy('created_at', 'desc'), limit(1));
        const uncheck = onSnapshot(getLast, (querySnapshot) => {
            const res = querySnapshot.docs[0];
            if(res != undefined) {
                const data = res.data();
                setCreatedAt(data.created_at.toDate().toLocaleDateString('id-ID')+' '+ data.created_at.toDate().toLocaleTimeString('en-GB'));
            }
        });
    }, []);

    const state = {
        series: [((100*totalSuara)/totalDpt.totalDPT).toFixed(2)],
        options: {
            chart: {
                type: 'radialBar',
                sparkline: {
                    enabled: true
                }
            },
            title: {
                text: 'Suara Masuk dan DPT',
                align: 'left'
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    },
                },
            },
            labels: ['Total Suara'],
        },
    }

    return (
        <Card style={{ marginBottom: '10px' }}>
            <div className="number">
                <Row align="middle" gutter={[24,0]}>
                    <Col xs={24} sm={24}>
                        <div id="chart">
                            <Chart options={state.options} series={state.series} type="radialBar"></Chart>
                        </div>
                    </Col>
                </Row>
                <small>Terakhir diperbaharui : <i>{createdAt}</i></small>
            </div>
        </Card>
    );
}