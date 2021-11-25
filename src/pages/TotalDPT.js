import { useState } from "react";
import { Row, Col, Typography, Button, Modal, Form, Input } from "antd";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import swal from "sweetalert";
import TotalDPTComponent from "../components/TotalDPTComponent";

function TotalDPT() {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [newTotal, setNewTotal] = useState("");
    const totalDPTcollection = collection(db, "totalDPT");

    const showModal = () => {
        setIsModalVisible(true);
    };
  
    const handleOk = async () => {
        await addDoc(totalDPTcollection, {
            totalDPT: newTotal,
            created_at: new Date(),
        });
        swal({
            title: "Berhasil disimpan!",
            text: "Data Total DPT berhasil diperbaharui!",
            icon: "success",
            buttons: false,
            timer: 1000,
        });          
        form.resetFields();
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    return (
        <>
        <div className="tabled">
            <Row gutter={[24, 0]} className="mb-24">
                <Col xs={24} md={24}>
                    <Button type="primary" onClick={showModal}>
                        <p className="text-white">Perbaharui</p>
                    </Button>
                    <Modal title="Perbaharui Data Total DPT" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Form form={form}>
                            <Row gutter={[24, 0]}>
                                <Col span={24} md={24}>
                                    <Form.Item
                                        name="totalDPT" rules={[{ required: true }]}>
                                        <Input 
                                            value={newTotal}
                                            onChange={(event) => {
                                                setNewTotal(event.target.value);
                                            }}
                                            type="number"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </Col>
            </Row>
            <Row gutter={[24, 0]}>
                <Col xs={6}>
                    <TotalDPTComponent></TotalDPTComponent>
                </Col>                        
            </Row>
        </div>
        </>
    );
}

export default TotalDPT;