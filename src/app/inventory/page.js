import Chart from "./Chart";
import DashboardCard from "./DashboardCard";

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <DashboardCard title="Total Inventory Value" value="$150,000" />
        <DashboardCard title="Total Stock" value="1,500" />
        <DashboardCard title="Stock Turnover Rate" value="2.5%" />
        <DashboardCard title="Low Stock Alerts" value="12" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-white shadow rounded-lg h-[50vh] sm:h-[65vh]">
          <Chart type="bar" />
        </div>
        <div className="p-4 bg-white shadow rounded-lg h-[50vh] sm:h-[65vh]">
          <Chart type="line" />
        </div>
      </div>
    </>
  );
}
