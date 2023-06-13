
import {React,useState} from 'react';
import { Layout, Menu, Breadcrumb, Collapse } from 'antd';
//import Icon from 'antd/lib/icon';
import { Link, Route, Switch } from 'react-router-dom';
import logo from './AIA.png';
import { useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  FileOutlined,
  BankOutlined,
  ToolOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Dashboard from './Components/Dashboard';



import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Components } from 'antd/es/date-picker/generatePicker';


const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Panel } = Collapse;

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
  };

  const isMenuVisible = location.pathname !== '/';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!collapsed && (
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div className="logo" style={{ height: '120px', margin: '50px' }}>
          <img src={logo} alt="AIA Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        </div>
 <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={selectedKeys}
            onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<DashboardOutlined />}><Link to="/dashboard">Dashboard</Link></Menu.Item>
          <Menu.SubMenu key="2" icon={<ShoppingCartOutlined />} title="Sales">
            <Menu.Item key="2.1"><Link to="/sales/orders">Orders</Link></Menu.Item>
            <Menu.Item key="2.2"><Link to="/sales/invoices">Invoices</Link></Menu.Item>
            <Menu.Item key="2.3"><Link to="/sales/delivery">Delivery</Link></Menu.Item>
            <Menu.Item key="2.4"><Link to="/sales/receivemoney">Receive Money</Link></Menu.Item>

          </Menu.SubMenu>
          <Menu.SubMenu key="3" icon={<FileOutlined />} title="Purchase">
            <Menu.Item key="3.1"><Link to="/purchase/orders">Orders</Link></Menu.Item>
            <Menu.Item key="3.2"><Link to="/purchase/invoices">Invoices</Link></Menu.Item>
            <Menu.Item key="3.3"><Link to="/purchase/good-receiving">Goods Receiving</Link></Menu.Item>
          </Menu.SubMenu>
        
          <Menu.SubMenu key="5" icon={<BankOutlined />} title="Accounts">
          <Menu.Item key="5.1"><Link to="/accounts/expense">Expense</Link></Menu.Item>
            <Menu.Item key="5.2"><Link to="/accounts/journal-entry">Journal Entry</Link></Menu.Item>
            
            <Menu.Item key="5.3"><Link to="/accounts/chartofaccounts">Chart Of Accounts</Link></Menu.Item>
            <Menu.Item key="5.4"><Link to="/accounts/bank-accounts">Bank Accounts</Link></Menu.Item>
       
          </Menu.SubMenu>
          <Menu.SubMenu key="6" icon={<ToolOutlined />} title="Inventory">
            <Menu.Item key="6.1"><Link to="/inventory/stock-movement">Stock Movement</Link></Menu.Item>
            <Menu.Item key="6.2"><Link to="/inventory/stock-adjustment">Stock Adjustment</Link></Menu.Item>
            {/*<Menu.Item key="6.3"><Link to="/inventory/assembling">Assembling</Link></Menu.Item>
            <Menu.Item key="6.4"><Link to="/inventory/disassembling">Disassembling</Link></Menu.Item>*/}
          </Menu.SubMenu>
{/* <Menu.Item key="7"><Link to="/manufacturing/assembling">Manufacturing</Link></Menu.Item> */}

            <Menu.SubMenu key="7" icon={<SettingOutlined />} title="SetUp">

                  <Menu.Item key="7.1"><Link to="/SetUp/Customers">Customers</Link></Menu.Item>
                  <Menu.Item key="7.2"><Link to="/SetUp/Product">Products</Link></Menu.Item>
                  <Menu.Item key="7.3"><Link to="/SetUp/Warehouse">Warehouses</Link></Menu.Item>

              </Menu.SubMenu>
              <Menu.Item key="8" icon={<UserOutlined />} ><Link to="/Users/UsersList">Users</Link>
</Menu.Item>
<Menu.Item key="9" icon={<LogoutOutlined />} ><Link to="/">LogOut</Link>
</Menu.Item>
           

</Menu>


  </Sider>
  )}
  <Layout>
    <Header style={{ background: '#fff', padding: '0 16px'  }}>
    
    
      </Header>
      <Content style={{ margin: '0 16px' }}>
      <div style={{ padding: 24, minHeight: 360 }}>
 {/* Content of the page */}
</div>
</Content>
    
    <Footer style={{ textAlign: 'center' }}>Apparel Industry Automation ©2023 Created by Ifrah, Hiza, Afsheen and Amina</Footer>
  </Layout>
</Layout>
);
};

export default Home;