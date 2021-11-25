import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Total Suara Sah Masuk</Title>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
