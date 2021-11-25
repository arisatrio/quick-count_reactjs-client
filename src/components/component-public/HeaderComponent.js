import { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";

export default function HeaderCompoent() {
    
    const [dateTime, setDateTime] = useState(new Date());
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    useEffect(() => {
        const time = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

    });

    const refreshData = () => {
        window.location.reload();
    }

    return (
        <Row className="rowgap-vbox" gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                <h1 style={{marginBottom: '0px'}}>{dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds()}</h1>
                <h3>{hari[dateTime.getDay()]}, {dateTime.getDate()} {bulan[dateTime.getMonth()]} {dateTime.getFullYear()}</h3>
                <Button type="primary" size={"small"} style={{ marginBottom: "10px" }} onClick={refreshData}>REFRESH DATA</Button>
            </Col>
        </Row>
    );
}