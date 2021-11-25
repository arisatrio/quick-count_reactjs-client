import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, doc } from "@firebase/firestore";
import { useHistory } from "react-router-dom";
import { db } from "../firebase-config";
import {
  Layout,
  Button,
  Card,
  Form,
  Input,
  Select,
} from "antd";
import swal from "sweetalert";

const { Header, Content } = Layout;
const { Option } = Select;

export default function LoginSaksi(){
	const [dataTPS, setDataTPS] = useState([]);  
	const dataTPScollection = collection(db, "dataTPS");

	
	const history = useHistory();

    const onFinish = (values) => {
		let key = values.id_tps;
		let inputPin = values.pin;

		const unsub = onSnapshot(doc(db, "dataTPS", key), (doc) => {
			if(doc.data().pin === inputPin){
				history.push('/home-saksi', {key: key} );
			} else {
				swal({
					title: "Kode Akses Salah!",
					text: "Error!",
					icon: "error",
					buttons: false,
					timer: 1500,
				});   
			}
		});
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        const q = query(dataTPScollection);

        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
				let key 		= doc.id;
				let id_tps 		= doc.data().id_tps;
				let kode_akses 	= doc.data().pin;
				
                data.push({key, id_tps, kode_akses});
            });
			setDataTPS(data);
        });

        return () => unsub();
    }, []);
	
    return (
      <>
        <div className="layout-default ant-layout layout-sign-up">
			<Header></Header>

          	<Content className="p-0">
				<div className="sign-up-header"></div>

					<Card
						className="card-signup header-solid h-full ant-card pt-0"
						title={<h5>Login Saksi</h5>}
						bordered="false"
					>

						<Form
							name="basic"
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							className="row-col"
						>
							<Form.Item
								name="id_tps"
								rules={[
									{ required: true, message: "Pilih TPS terlebih dahulu!" },
								]}
							>
								<Select defaultValue="--Pilih TPS--">
									{dataTPS.map((value) => {
										return (
											<Option value={value.key} key={value.key}>{value.id_tps}</Option>
										);
									})};
								</Select>
							</Form.Item>

							<Form.Item
								name="pin"
								rules={[
									{ required: true, message: "Masukkan kode akses!" },
								]}
							>
								<Input placeholder="Kode Akses" />
							</Form.Item>

							<Form.Item>
								<Button
									style={{ width: "100%" }}
									type="danger"
									htmlType="submit"
								>
									LOGIN
								</Button>
							</Form.Item>
						</Form>
            		</Card>
          	</Content>
          
        </div>
      </>
    );

}