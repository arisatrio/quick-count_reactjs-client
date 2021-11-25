import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, query, orderBy, addDoc, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { Row, Col, Table, Button, Modal, Form, Input, Space, Tag  } from "antd";
import swal from "sweetalert";

function DataTPS() {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const tpsCollection = collection(db, "dataTPS");
    const [dataTPS, setDataTPS] = useState([]);
    const [tps, setTps] = useState("");
    const [saksi, setSaksi] = useState("");

    const [key, setKey] = useState("");

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        await setDoc(doc(db, "dataTPS", tps), {
            id_tps: tps,
            nama_saksi: saksi,
            pin: 'salamduajari'+tps.split("-")[1],
            created_at: new Date(),
        });
        swal({
            title: "Berhasil disimpan!",
            text: "Data TPS Baru Berhasil ditambahkan!",
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
        setEditModalVisible(false);
    };

      
        const editModal = (key) => {
            setEditModalVisible(true);
            editData();
            
            // const docRef = doc(db, "dataTPS", key);
            // const docSnap = getDoc(docRef);

            const unsub = onSnapshot(doc(db, "dataTPS", key), (doc) => {
                setTps(doc.data().id_tps);
                setSaksi(doc.data().nama_saksi);

                console.log(saksi);
            });

            // setTps(docSnap.data().id_tps);
            // setSaksi(docSnap.data().nama_saksi);
            // console.log("Document data:", docSnap.data());
        };

    const editData = () => {
        
    }

    useEffect(() => {
        const q = query(tpsCollection, orderBy('id_tps', 'asc'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                var key = doc.id;
                var id_tps = doc.data().id_tps;
                var nama_saksi = doc.data().nama_saksi;
                var pin = doc.data().pin;
                var created_at = doc.data().created_at.toDate().toLocaleDateString('id-ID') + ' ' + doc.data().created_at.toDate().toLocaleTimeString('en-GB');

                data.push({key, id_tps, nama_saksi, pin, created_at});
            });
            setDataTPS(data);
        });

        return () => unsub();
    }, []);

    const columns = [
        {
            title: "TPS",
            dataIndex: "id_tps",
            key: "id_tps",
            width: "20%",
        },
        {
            title: "Nama Saksi",
            dataIndex: "nama_saksi",
            key: "nama_saksi",
            width: "30%",
        },
        {
            title: "Kode Akses",
            dataIndex: "pin",
            key: "pin",
            width: "15%",
            render: text => <Tag color={'volcano'}>{text}</Tag>
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            width: "15%",
        },
        {
            title: "Aksi",
            dataIndex: "aksi",
            key: "aksi",
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => editModal(record.key)} className="text-gray-6">EDIT</a>
                    <a onClick={showModal} className="text-danger">DELETE</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]} className="mb-24">
                    <Col xs={24} md={24}>
                        <Button type="primary" onClick={showModal}>
                            <p className="text-white">Tambah Data TPS</p>
                        </Button>
                        <Modal title="Tambah Data TPS" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Form 
                                form={form}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Row gutter={[24, 0]}>
                                    <Col span={24} md={24}>
                                        <Form.Item
                                            label="TPS"
                                            name="tps" rules={[{ required: true }]}>
                                            <Input 
                                                placeholder="Contoh: TPS-001"
                                                value={tps}
                                                onChange={(event) => {
                                                    setTps(event.target.value);
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Nama Saksi"
                                            name="nama_saksi" rules={[{ required: true }]}>
                                            <Input 
                                                placeholder="Contoh: Budi"
                                                value={saksi}
                                                onChange={(event) => {
                                                    setSaksi(event.target.value);
                                                }}
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
                            columns={columns}
                            dataSource={dataTPS}
                            pagination={false}
                            className="ant-border-space"
                            />
                        </div>
                    </Col>
                </Row>
                <Modal title="Edit Data TPS" visible={editModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form 
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Row gutter={[24, 0]}>
                            <Col span={24} md={24}>
                                <Form.Item
                                    label="TPS"
                                    name="tps" rules={[{ required: true }]}>
                                        
                                    <Input 
                                        placeholder="Contoh: TPS-001"
                                        defaultValue={tps}
                                        onChange={(event) => {
                                            setTps(event.target.value);
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Nama Saksi"
                                    name="nama_saksi" rules={[{ required: true }]}>
                                    <Input 
                                        placeholder="Contoh: Budi"
                                        defaultValue={saksi}
                                        onChange={(event) => {
                                            setSaksi(event.target.value);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </>
    )
}

export default DataTPS;