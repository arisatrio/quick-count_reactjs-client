
import { Affix, Button, Layout, Row, Col } from "antd";
import { NavLink } from "react-router-dom";

const { Header: AntHeader, Content } = Layout;

function LayoutSaksi({children}) {

    return (
        <Layout
            className={`layout-dashboard`}
        >
                <AntHeader>
                    <Row gutter={[24, 0]}>
                        <Col span={18} md={6}>
                            <div className="ant-page-header-heading">
                                <span
                                    className="ant-page-header-heading-title"
                                    style={{ textTransform: "capitalize" }}
                                >
                                    Aplikasi Quick Count Pilwu
                                </span>
                            </div>
                        </Col>
                        <NavLink to="/login-saksi">
                            <span className="label text-danger">LOGOUT</span>
                        </NavLink>
                    </Row>
                </AntHeader>

                <div className="layout-default ant-layout">
                    <Content className="content-ant p-0">{children}</Content>
                </div>

        </Layout>
    );
}

export default LayoutSaksi;