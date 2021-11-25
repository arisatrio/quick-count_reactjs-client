import { Card, Timeline, Typography } from "antd";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, doc, where, limit } from "@firebase/firestore";
import { db } from "../../firebase-config";

export default function HistoryComponent() {
    const { Title, Text } = Typography;

    const [recordSuara, setRecordSuara] = useState([]);

    const suaraCollection = collection(db, "hasilSuara");

    useEffect(() => {
        const getRecord = query(suaraCollection, orderBy('created_at', 'desc'));
        const unset = onSnapshot(getRecord, (querySnapshot) => {
            const recArray = [];
            querySnapshot.forEach((doc) => {
                let no_urut = doc.data().calon_key;
                let tps_key = doc.data().tps_key;
                let nama_saksi = doc.data().nama_saksi;

                let data = doc.data();
                let created_at = data.created_at.toDate().toLocaleDateString('id-ID') + ' ' + data.created_at.toDate().toLocaleTimeString('en-GB');

                recArray.push({no_urut, tps_key, nama_saksi, created_at});
            });
            setRecordSuara(recArray);
        });
    });

    return (
        <Card bordered={false} className="criclebox h-full" style={{ marginBottom: '10px' }}>
            <div className="timeline-box">
                <Title level={5} style={{ marginBottom: '20px' }}>Riwayat</Title>
                <Timeline className="timelinelist">
                    {recordSuara.map((value, index) => (
                        <Timeline.Item key={index}>
                            <Title level={5}>Input Data Calon <b>{value.no_urut}</b> di <b>{value.tps_key}</b></Title>
                            <Text>Oleh <b>{value.nama_saksi}</b> pada <b>{value.created_at}</b></Text>
                        </Timeline.Item>
                    ))}
                </Timeline>
            </div>
        </Card>
    );
}