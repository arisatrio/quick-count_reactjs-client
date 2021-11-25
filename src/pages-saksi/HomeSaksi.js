import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Card } from "antd";
import LayoutSaksi from "./LayoutSaksi";
import HasilSuaraComponent from "../components/component-saksi/HasilSuaraComponent";
import InputSuaraComponenent from "../components/component-saksi/InputSuaraComponent";

export default function HomeSaksi() {
    const tps = useLocation();
    const [dateTime, setDateTime] = useState(new Date());
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    useEffect(() => {
        const time = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(time);
        }
    }, []);
	
    return (
      <>
        <LayoutSaksi>
            <div className="layout-content">
                <Row className="rowgap-vbox" gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                        <h1 style={{marginBottom: '0px'}}>{dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds()}</h1>
                        <h3>{hari[dateTime.getDay()]}, {dateTime.getDate()} {bulan[dateTime.getMonth()]} {dateTime.getFullYear()}</h3>
                    </Col>
                </Row>

                <Row className="rowgap-vbox" gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                        <HasilSuaraComponent tps={tps.state.key} />
                    </Col>
                </Row>

                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                        <InputSuaraComponenent tps={tps.state.key} />
                    </Col>
                </Row>
            </div>
        </LayoutSaksi>
      </>
    );
    
}
