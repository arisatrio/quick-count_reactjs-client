import { Card, Row, Col, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config';
import { collection, onSnapshot, orderBy, query, doc, where, limit } from "@firebase/firestore";

export default function CardTotalSuaraComponent() {
    const { Title } = Typography;
    
    const tables = [
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={0}
        >
          <path
            d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
            fill="white"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
            fill="white"
          ></path>
        </svg>,
    ];

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

    return (
        <Card style={{ marginBottom: '10px'  }}>
            <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18} sm={24}>
                        <span>Total Suara Sah Masuk</span>
                        <Title level={3}>
                            {totalSuara} <small className="bnb2"> {((100*totalSuara)/totalDpt.totalDPT).toFixed(2)}%</small>
                        </Title>
                        <small>Terakhir diperbaharui : <i>{createdAt}</i></small>
                    </Col>
                    <Col xs={6}>
                        <div className="icon-box">{tables}</div>
                    </Col>
                </Row>
            </div>
        </Card>
    );
}