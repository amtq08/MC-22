import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import logo from './AIA.png';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const data = [
  { name: 'Jan', Sales: 4000, Expenses: 2400, amt: 2400 },
  { name: 'Feb', Sales: 3000, Expenses: 1398, amt: 2210 },
  { name: 'Mar', Sales: 2000, Expenses: 9800, amt: 2290 },
  { name: 'Apr', Sales: 2780, Expenses: 3908, amt: 2000 },
  { name: 'May', Sales: 1890, Expenses: 4800, amt: 2181 },
  { name: 'Jun', Sales: 2390, Expenses: 3800, amt: 2500 },
  { name: 'Jul', Sales: 3490, Expenses: 4300, amt: 2100 },
  { name: 'Aug', Sales: 4000, Expenses: 2400, amt: 2400 },
  { name: 'Sep', Sales: 3000, Expenses: 1398, amt: 2210 },
  { name: 'Oct', Sales: 2000, Expenses: 9800, amt: 2290 },
  { name: 'Nov', Sales: 2780, Expenses: 3908, amt: 2000 },
  { name: 'Dec', Sales: 1890, Expenses: 4800, amt: 2181 },
];

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
     
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h1>Sales and Expenses Chart</h1>
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Expenses" stroke="#82ca9d" />
        </LineChart>
      </div>

      <Footer style={{ textAlign: 'center' }}>Apparel Industry Automation ©2023 Created by Ifrah, Hiza, Afsheen and Amina</Footer>
  </Layout>

);
};

export default Dashboard;
