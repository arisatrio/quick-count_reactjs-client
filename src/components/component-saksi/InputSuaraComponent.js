import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Select, Button } from 'antd';
import swal from "sweetalert";
import { db } from '../../firebase-config';
import { collection, onSnapshot, orderBy, query, doc, where, getDocs, runTransaction } from "@firebase/firestore";

const { Option } = Select;

function InputSuaraComponenent({tps}) {
    const [dataTPS, setDataTPS] = useState("");
    const [dataCalon, setDataCalon] = useState([]);
    const [selectedCalon, setSelectedCalon] = useState("");
    const [newTotal, setNewTotal] = useState(0);

    const calonCollection = collection(db, "calon");

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        let total_suara = parseInt(values.total_suara);
        let key         = tps+'_'+values.calon_key;

        const tpsRef = doc(db, "dataTPS", tps);
        const hasilSuaraRef = doc(db, "hasilSuara", key);
        const hasilSuaraCollection = collection(db, "hasilSuara"); 
        const calonRef = doc(db, "calon", values.calon_key);

        try{
            const addNamaSaksi = await runTransaction(db, async (transaction) => {

                const currentTotalInCalon = await transaction.get(calonRef);
                const currentTotalInTPS = await transaction.get(hasilSuaraRef);
                const tpsDoc = await transaction.get(tpsRef);

                if(!currentTotalInCalon.exists()) {
                    form.resetFields();
                    swal({
                        title: "Data Calon tidak ditemukan!",
                        text: "Error!",
                        icon: "error",
                        buttons: false,
                        timer: 1000,
                    });
                }
                if(!tpsDoc.exists()) {
                    form.resetFields();
                    swal({
                        title: "Data TPS tidak ditemukan!",
                        text: "Error!",
                        icon: "error",
                        buttons: false,
                        timer: 1000,
                    });
                }

                if(currentTotalInTPS.exists()) {
                    const totalSuara = parseInt(currentTotalInCalon.data().total_suara - currentTotalInTPS.data().total_suara);
                    transaction.update(calonRef, {
                        total_suara: totalSuara + total_suara
                    });
                } else {
                    transaction.update(calonRef, {
                        total_suara: currentTotalInCalon.data().total_suara + total_suara
                    });
                }

                const namaSaksi = tpsDoc.data().nama_saksi;
                transaction.set(hasilSuaraRef, {
                    tps_key: tps,
                    calon_key: values.calon_key,
                    nama_calon: selectedCalon,
                    total_suara: total_suara,
                    nama_saksi: namaSaksi,
                    created_at: new Date(),
                });

                swal({
                    title: "Berhasil disimpan!",
                    text: "Data Total Suara berhasil diinput!",
                    icon: "success",
                    buttons: false,
                    timer: 1500,
                });
                form.resetFields();
            });
        } catch (e) {
            console.log(e);
            form.resetFields();
            swal({
                title: "Error!",
                text: "Error!",
                icon: "error",
                buttons: false,
                timer: 1000,
            });
        }
    };

    const onChange = (values) => {
        const unsub = onSnapshot(doc(db, "calon", values), (doc) => {
            setSelectedCalon(doc.data().nama_calon);
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        const q = query(calonCollection, orderBy('no_urut', 'asc'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                let key = doc.id;
                let no_urut = doc.data().no_urut;
                let nama_calon = doc.data().nama_calon;

                data.push({key, no_urut, nama_calon});
            });
            setDataCalon(data);
        });

        return () => unsub();
    }, []);

    return (
        <>
            <Card 
                bordered={false} 
                className="criclebox" 
                title={<h3>Input Total Suara</h3>}
                align="center"
            >
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="row-col"
                >
                    <Form.Item
                        name="calon_key"
                        rules={[
                            { required: true, message: "Pilih Calon terlebih dahulu!" },
                        ]}
                    >
                        <Select defaultValue="--Pilih Calon--" onChange={onChange}>
                            {dataCalon.map((value) => {
                                return (
                                    <Option value={value.no_urut} key={value.no_urut}>({value.no_urut}) {value.nama_calon}</Option>
                                );
                            })};
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="total_suara"
                        rules={[
                            { required: true, message: "Masukkan Total Suara!" },
                        ]}
                    >
                        <Input placeholder="Total Suara" type="number" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{ width: "100%" }}
                            type="danger"
                            htmlType="submit"
                        >
                            KIRIM
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </>
    );
};

export default InputSuaraComponenent;