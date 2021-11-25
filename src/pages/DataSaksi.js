import { useState, useEffect } from "react";
import { Row, Col, Table, Button, Modal, Form, Input } from "antd";

function DataSaksi() {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        // await addDoc(totalDPTcollection, {
        //     totalDPT: newTotal,
        //     created_at: new Date(),
        // });
        // swal({
        //     title: "Berhasil disimpan!",
        //     text: "Data Total DPT berhasil diperbaharui!",
        //     icon: "success",
        //     buttons: false,
        //     timer: 1000,
        // });          
        form.resetFields();
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    useEffect(() => {
        // const listAllUsers = (nextPageToken) => {
        //     // List batch of users, 1000 at a time.
        //     getAuth()
        //       .listUsers(1000, nextPageToken)
        //       .then((listUsersResult) => {
        //         listUsersResult.users.forEach((userRecord) => {
        //           console.log('user', userRecord.toJSON());
        //         });
        //         if (listUsersResult.pageToken) {
        //           // List next batch of users.
        //           listAllUsers(listUsersResult.pageToken);
        //         }
        //       })
        //       .catch((error) => {
        //         console.log('Error listing users:', error);
        //       });
        //   };
        //   // Start listing users from the beginning, 1000 at a time.
        //   listAllUsers()
    }, []);

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]} className="mb-24">
                    <Col xs={24} md={24}>
                        <Button type="primary" onClick={showModal}>
                            <p className="text-white">Tambah Data Saksi</p>
                        </Button>
                        <Modal title="Perbaharui Data Total DPT" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Form form={form}>
                                <Row gutter={[24, 0]}>
                                    <Col span={24} md={24}>
                                        <Form.Item
                                            name="totalDPT" rules={[{ required: true }]}>
                                            <Input 
                                                // value={newTotal}
                                                // onChange={(event) => {
                                                //     setNewTotal(event.target.value);
                                                // }}
                                                type="number"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                    </Col>
                </Row>
                <Row gutter={[24, 0]} className="mb-24">
                    <Col xs={24} md={24}>
                        
                    <div className="table-responsive">
                        <Table
                        // columns={columns}
                        // dataSource={data}
                        pagination={false}
                        className="ant-border-space"
                        />
                    </div>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default DataSaksi;