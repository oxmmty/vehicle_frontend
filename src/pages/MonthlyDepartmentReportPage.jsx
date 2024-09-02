import React from 'react';
import { Table, Tabs, Collapse, Layout, Typography } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Title } = Typography;
const { Header, Content } = Layout;

// Define columns for the Revenue table
const revenueColumns = [
  { title: 'Month', dataIndex: 'month', key: 'month' },
  { title: 'Truck Revenue', dataIndex: 'truckRevenue', key: 'truckRevenue' },
  { title: 'Total Revenue', dataIndex: 'totalRevenue', key: 'totalRevenue' },
  { title: 'Profit', dataIndex: 'profit', key: 'profit' },
];

// Define data for the Revenue table
const revenueData = [
  { key: '1', month: 'August', truckRevenue: 37735, totalRevenue: 41873, profit: 41983 },
  { key: '2', month: 'September', truckRevenue: 28498, totalRevenue: 29993, profit: 40983 },
  { key: '3', month: 'October', truckRevenue: 38988, totalRevenue: 40593, profit: 39983 },
  // Add more data as needed
];

// Define columns for the Expenses table
const expenseColumns = [
  { title: 'Month', dataIndex: 'month', key: 'month' },
  { title: 'Material Costs', dataIndex: 'materialCosts', key: 'materialCosts' },
  { title: 'Labor Costs', dataIndex: 'laborCosts', key: 'laborCosts' },
  { title: 'Outsourcing Costs', dataIndex: 'outsourcingCosts', key: 'outsourcingCosts' },
  { title: 'Total Expenses', dataIndex: 'totalExpenses', key: 'totalExpenses' },
];

// Define data for the Expenses table
const expenseData = [
  { key: '1', month: 'August', materialCosts: 8122, laborCosts: 5680, outsourcingCosts: 6790, totalExpenses: 12516 },
  { key: '2', month: 'September', materialCosts: 8503, laborCosts: 5290, outsourcingCosts: 7208, totalExpenses: 11801 },
  { key: '3', month: 'October', materialCosts: 8382, laborCosts: 5487, outsourcingCosts: 8396, totalExpenses: 11901 },
  // Add more data as needed
];

// Define columns for the Gross Profit table
const profitColumns = [
  { title: 'Month', dataIndex: 'month', key: 'month' },
  { title: 'Gross Profit', dataIndex: 'grossProfit', key: 'grossProfit' },
];

// Define data for the Gross Profit table
const profitData = [
  { key: '1', month: 'August', grossProfit: 19896 },
  { key: '2', month: 'September', grossProfit: 18061 },
  { key: '3', month: 'October', grossProfit: 21064 },
  // Add more data as needed
];

const MonthlyDepartmentReportPage = () => {
  return (
    <div>
      <Title level={2} className='text-center'>Monthly and Yearly Financial Report</Title>
      <Content style={{ padding: '20px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Revenue" key="1">
            <Table columns={revenueColumns} dataSource={revenueData} pagination={false} />
          </TabPane>
          <TabPane tab="Expenses" key="2">
            <Table columns={expenseColumns} dataSource={expenseData} pagination={false} />
          </TabPane>
          <TabPane tab="Gross Profit" key="3">
            <Table columns={profitColumns} dataSource={profitData} pagination={false} />
          </TabPane>
        </Tabs>
        <Collapse style={{ marginTop: '20px' }}>
          <Panel header="Additional Notes" key="1">
            <p>Details and remarks about the data...</p>
          </Panel>
        </Collapse>
      </Content>
    </div>
  );
};

export default MonthlyDepartmentReportPage;
