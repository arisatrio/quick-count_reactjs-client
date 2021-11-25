import { Card, Col, Row, Layout, Button } from 'antd';
import React from 'react';

import HeaderCompoent from '../components/component-public/HeaderComponent';
import CardTotalSuaraComponent from '../components/component-public/CardTotalSuaraComponent';
import CardTotalDptComponent from '../components/component-public/CardTotalDptComponent';
import ChartBarComponent from '../components/component-public/ChartBarComponent';
import ChartPieComponent from '../components/component-public/ChartPieComponent';
import ChartStackedBarComponent from '../components/component-public/ChartStackedBarComponent';
import HistoryComponent from '../components/component-public/HistoryComponent';
import GaugeSuaraDptComponent from '../components/component-public/GaugeSuaraDptComponent';

const { Header: AntHeader, Content, Footer: AntFooter  } = Layout;

export default function Dashboard(){
    return (
        <Layout
            className={`layout-dashboard`}
        >
            <AntHeader>
                <Row gutter={[24, 0]}>
                    <Col span={24} md={6}>
                        <div className="ant-page-header-heading">
                            <span
                                className="ant-page-header-heading-title"
                                style={{ textTransform: "capitalize" }}
                            >
                                Aplikasi Quick Count Pilwu Desa Kejiwan
                            </span>
                        </div>
                    </Col>
                </Row>
            </AntHeader>

            <div className="layout-default ant-layout">
                <Content className="content-ant p-0">
                    <div className="layout-content">
                        <HeaderCompoent />
                        <CardTotalDptComponent />
                        <CardTotalSuaraComponent />
                        <ChartBarComponent />
                        <ChartPieComponent />
                        <ChartStackedBarComponent />
                        <GaugeSuaraDptComponent />
                        <HistoryComponent />
                    </div>
                </Content>
            </div>
            
            <AntFooter style={{ background: "#fafafa" }}>
                <Row className="just">
                    <Col xs={24} md={12} lg={12}>
                        <div className="copyright">
                        © 2021
                        by
                        <a href="#pablo" className="font-weight-bold" target="_blank">
                            Ari Satrio
                        </a>
                        </div>
                    </Col>
                </Row>
            </AntFooter>
        </Layout>
    );
}