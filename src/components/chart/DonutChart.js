import React, { Component, useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, onSnapshot, orderBy, query, doc, collectionGroup, where, limit } from "@firebase/firestore";
import Chart from 'react-apexcharts'

function DonutChart({tps}) {
	const [dataCalon, setDataCalon] = useState([]);
	const [namaCalon, setNamaCalon] = useState([]);
	const [totalSuara, setTotalSuara] = useState([]);
	const [total, setTotal] = useState("");

	const calonCollection = collection(db, "calon");
	const suaraCollection = collection(db, "hasilSuara");

    const state = {
      	options: {
			labels: namaCalon,
			chart: {
				offsetX: -35,
			},
			noData: {
				text: "Data Kosong",
				align: 'center',
				verticalAlign: 'middle',
				offsetX: -50,
				offsetY: 0,
				style: {
					color: "#8c8c8c",
					fontSize: '14px',
				}
			},
			tooltip: {
				enabled: true,
				enabledOnSeries: undefined,
				shared: true,
				followCursor: false,
				intersect: false,
				inverseOrder: false,
				custom: undefined,
				fillSeriesColor: false,
				theme: "dark",
				style: {
				  fontSize: '12px',
				  fontFamily: undefined
				},
				onDatasetHover: {
					highlightDataSeries: true,
				},
				marker: {
					show: true,
				},
				fixed: {
					enabled: false,
					position: 'topRight',
					offsetX: 0,
					offsetY: 0,
				},
			}
		},
    };

	useEffect(() => {
		const suara = query(suaraCollection, where('tps_key', '==', tps));
		const unset = onSnapshot(suara, (querySnapshot) => {
			const totalSuaraArray = [];
			const namaCalonArray = [];
			let total = 0;
			querySnapshot.forEach((doc) => {
				let total_suara = doc.data().total_suara;
				let nama_calon = '('+doc.data().calon_key+') '+doc.data().nama_calon;
				total = total + doc.data().total_suara;

				totalSuaraArray.push(total_suara);
				namaCalonArray.push(nama_calon);
			});
			setNamaCalon(namaCalonArray);
			setTotalSuara(totalSuaraArray);
			setTotal(total);
		});

	}, []);

	const handleCek = () => {
		console.log(total);
	}

    return (
		<>
			<div className="donut">
				<Chart options={state.options} series={totalSuara} type="pie" width="120%" />
			</div>
			<button onClick={handleCek}>CEK</button>
		</>
    );
  
}

export default DonutChart;