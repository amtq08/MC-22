

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';


import Home from './Home';
import PrivateRoute from './PrivateRoute';
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
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Layout, Menu, Breadcrumb } from 'antd';
//import Icon from 'antd/lib/icon';
import logo from './AIA.png';
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import Dashboard from './Components/Dashboard';



import SalesOrders from './Components/Sales/Order';
import SalesInvoice from './Components/Sales/Invoice';
import SalesDelivery from './Components/Sales/Delivery';
import SalesComponent from './Components/Sales/SalesComponent'
import ReceiveMoney from './Components/Sales/ReceiveMoney';
import AddOrder from './Components/Sales/AddOrder';
import AddDelivery from './Components/Sales/AddDelivery';
import AddInvoice from './Components/Sales/AddInvoice';

import PurchaseOrder from './Components/Purchase/Order';
import PurchaseInvoice from './Components/Purchase/Invoice';
import PurchaseGoodReceiving from './Components/Purchase/GoodReceiving';


import StockMovement from './Components/Inventory/StockMovement';
import AddStockMovement from './Components/Inventory/AddStockMovement';
import ViewStockMovement from './Components/Inventory/ViewStockMovement';
import StockAdjustment from './Components/Inventory/StockAdjustment';
import AddStockAdjustment from './Components/Inventory/AddStockAdjustment';
import ViewStockAdjustment from './Components/Inventory/ViewStockAdjustment';
import Assembling from './Components/Inventory/Assembling';
import Disassembling from './Components/Inventory/Disassembling';

import Customers from './Components/SetUp/Customers';
import AddCustomer from './Components/SetUp/AddCustomer';
import ViewCustomer from './Components/SetUp/ViewCustomer';
import Product from './Components/SetUp/Product';
import ViewProduct from './Components/SetUp/ViewProduct';
import AddProduct from './Components/SetUp/AddProduct';
import Warehouse from './Components/SetUp/Warehouse';


import BankDeposit from './Components/Accounts/BankDeposit';
import BankAccounts from './Components/Accounts/BankAccounts';
import AddBankAccount from './Components/Accounts/AddBankAccount';
import AddJournalEntry from './Components/Accounts/AddJournalEntry';
import chartofaccounts from './Components/Accounts/chartofaccounts.jsx';
import AddAccount from './Components/Accounts/AddAccount';
import ViewAccount from './Components/Accounts/ViewAccount';
import ViewBankAccount from './Components/Accounts/ViewBankAccount';
import CreditNote from './Components/Accounts/CreditNote';
import DebitNote from './Components/Accounts/DebitNote';
import Expense from './Components/Accounts/Expense';
import AddExpense from './Components/Accounts/AddExpense';
import ViewExpense from './Components/Accounts/ViewExpense';
import JournalEntry from './Components/Accounts/JournalEntry';
import ViewJournalEntry from './Components/Accounts/ViewJournalEntry';

import UsersList from './Components/Users/userslist';
import RoleAssignment from './Components/Users/RoleAssignment';
import { Button, Row, Col, Modal, Form, Input, notification } from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();

  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = window.history;
  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setLogInVisible] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();


  const from = location.state?.from?.pathname || "/";


  const [signUp, setSignUp] = useState({
    userName: '',
    email: '',
    contact: '',
    password: '',
    confirmpassword: '',
    designation: 'admin',

  });
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  function handleClick(event) {
    event.preventDefault();

    // Get the href of the link that was clicked
    const href = event.target.href;

    // Use the history object to update the browser's history
    history.pushState({}, '', href);
  }
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
  };
  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setIsAuthenticated(true);
    setUserRole(userRole);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);

  };
  const handleLoginClick = () => {
    setLogInVisible(true);
  };

  const handleSignupClick = () => {
    setSignupVisible(true);
  };

  const handleSignupCancel = () => {
    setSignupVisible(false);
  };
  const handleLoginCancel = () => {
    setLogInVisible(false);
  };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (

          <LandingPage />
        )
      }
    />
  );
  document.querySelectorAll('Link').forEach(link => {
    link.addEventListener('click', handleClick);
  });
  const onFinish = async (values, userRole) => {
    setLoading(true);


    if (signupVisible) {
      const data = {

        userName: values.userName,
        email: values.email,
        contact: values.contact,
        password: values.password,
        confirmpassword: values.confirmPassword,
        designation: 'admin',
      };
      // Process signup form submission


      try {
        // Check if the email already exists
        const existingUserResponse = await axios.get(
          `http://localhost:8080/api/signup?email=${data.email}`
        );
        if (existingUserResponse.data === 'emailExists') {
          // Email already exists, show error message
          setEmailExists(true);
          notification.error({
            message: 'Error',
            description: 'Email already exists. Please enter a different email.',
          });
        } else {
          try {
            const response = await axios.post('http://localhost:8080/api/signup', data);
            if (response.status === 200) {
              // Handle signup success
              notification.success({
                message: 'Success',
                description: 'User created successfully.',
              });
              form.resetFields();
              setSignupVisible(false);
            } else {
              // Handle signup failure
              notification.error({
                message: 'Error',
                description: 'An error occurred. Please try again.',
              });
            }
          } catch (error) {
            console.error(error);
            // Handle signup failure
            notification.error({
              message: 'Error',
              description: 'An error occurred. Please try again.',
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (loginVisible) {
      // Process login form submission
      try {
        const response = await axios.post('http://localhost:8080/api/login', values);
        if (response.status === 200) {
          const userDesignation = await axios.get(`http://localhost:8080/api/login?userName=${values.userName}`);



          setIsAuthenticated(true);
          setUserRole(userDesignation.data);
          setIsLoggedIn(true);

          const userRole = userDesignation.data;
          {/*if (userRole === 'admin') {
              history.push('/'); // Redirect to the admin component
            } else if (userRole === 'sales') {
              history.push('/sales'); // Redirect to the sales component
            } else if (userRole === 'purchase') {
              history.push('/purchase'); // Redirect to the purchase component
            } else if (userRole === 'inventory') {
              history.push('/inventory'); // Redirect to the inventory component
            } else if (userRole === 'accounts') {
            history.push('/accounts'); // Redirect to the accounts component
            }else{
              history.push('/')
            }*/}
          //role based access

          // Handle login success

          notification.success({
            message: 'Success',
            description: 'Log In successful!.',
          });
        } else {
          // Handle login failure
          notification.error({
            message: 'Error',
            description: 'Invalid username or password. Please try again.',
          });
          form.resetFields();
        }
      } catch (error) {
        console.error(error);
        // Handle login failure
        // ...
      }
    }

    setTimeout(() => {
      setLoading(false);
      form.resetFields();
      setSignupVisible(false);
    }, 2000);
  };


  const validatePassword = (_, value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        'Password must be at least 8 characters long and contain at least one capital letter and a number'
      )
    );
  };

  const LandingPage = () => {




    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to Enterprise Resource Planning System</h1>
        <div className="logo" style={{ height: '120px', margin: '50px' }}>
          <img src={logo} alt="AIA Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        </div>
        <Row justify="center" gutter={[16, 16]}>
          <Col>
            <Button type="primary" size="large" onClick={handleLoginClick}>
              Login
            </Button>
          </Col>
          <Col>
            <Button type="default" size="large" onClick={handleSignupClick}>
              Signup
            </Button>
          </Col>
        </Row>

        <Modal
          title="Sign Up"
          visible={signupVisible}
          onCancel={handleSignupCancel}
          footer={null}
        >
          <Form form={form} name="signup" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="userName"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="contact"
              label="Contact Number"
              rules={[
                {
                  required: true,
                  message: 'Please enter your contact number',
                },
                {
                  pattern: /^\d+$/,
                  message: 'Contact number should only contain digits',
                },
              ]}
            >
              <Input placeholder="Enter your contact number" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Sign Up
              </Button>

            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Log In"
          visible={loginVisible}
          onCancel={handleLoginCancel}
          footer={null}
        >
          <Form name="loginForm" initialValues={{ remember: true }} onFinish={onFinish} style={{ width: 300 }}>
            <h1 style={{ textAlign: 'center' }}>Log In</h1>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                { required: true, message: 'Please input your user name!' },

              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { validator: validatePassword },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                Log In
              </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
              <a href="/reset-password">Forgot Password?</a>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };


  const renderMenuItems = () => {
    if (userRole === 'admin') {
      // Render the full sidebar for admin
      return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[location.pathname]}>
          {/* ... Admin menu items */}

          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/" >Dashboard</Link>
          </Menu.Item>
          <SubMenu key="2" icon={<ShoppingCartOutlined />} title="Sales">
            <Menu.Item key="2.1">
              <Link to="/sales/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="2.2">
              <Link to="/sales/invoices">Invoices</Link>
            </Menu.Item>
            <Menu.Item key="2.3">
              <Link to="/sales/delivery">Delivery</Link>
            </Menu.Item>
            <Menu.Item key="2.4">
              <Link to="/sales/receivemoney">Receive Money</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="3" icon={<FileOutlined />} title="Purchase">
            <Menu.Item key="3.1">
              <Link to="/purchase/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="3.2">
              <Link to="/purchase/invoices">Invoices</Link>
            </Menu.Item>
            <Menu.Item key="3.3">
              <Link to="/purchase/good-receiving">Goods Receiving</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="4" icon={<BankOutlined />} title="Accounts">
            <Menu.Item key="4.1">
              <Link to="/accounts/expense">Expense</Link>
            </Menu.Item>
            <Menu.Item key="4.2">
              <Link to="/accounts/journal-entry">Journal Entry</Link>
            </Menu.Item>
            <Menu.Item key="4.3">
              <Link to="/accounts/chartofaccounts">Chart Of Accounts</Link>
            </Menu.Item>
            <Menu.Item key="4.4">
              <Link to="/accounts/bank-accounts">Bank Accounts</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="5" icon={<ToolOutlined />} title="Inventory">
            <Menu.Item key="5.1">
              <Link to="/inventory/stock-movement">Stock Movement</Link>
            </Menu.Item>
            <Menu.Item key="5.2">
              <Link to="/inventory/stock-adjustment">Stock Adjustment</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="6" icon={<SettingOutlined />} title="SetUp">
            <Menu.Item key="6.1">
              <Link to="/SetUp/Customers">Customers</Link>
            </Menu.Item>
            <Menu.Item key="6.2">
              <Link to="/SetUp/Product">Products</Link>
            </Menu.Item>
            <Menu.Item key="6.3">
              <Link to="/SetUp/Warehouse">Warehouses</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<UserOutlined />} >
            <Link to="/Users/UsersList">Users</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<LogoutOutlined />} onClick={handleLogout} >
            LogOut
          </Menu.Item>
        </Menu>
      );
    } else if (userRole === 'sales') {
      // Render sales-related menu items for sales role
      return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={selectedKeys}>
          {/* ... Sales menu items */}
          <SubMenu key="1" icon={<ShoppingCartOutlined />} title="Sales">
            <Menu.Item key="1.1">
              <Link to="/sales/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="1.2">
              <Link to="/sales/invoices">Invoices</Link>
            </Menu.Item>
            <Menu.Item key="1.3">
              <Link to="/sales/delivery">Delivery</Link>
            </Menu.Item>
            <Menu.Item key="1.4">
              <Link to="/sales/receivemoney">Receive Money</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout} >
            LogOut
          </Menu.Item>
        </Menu>
      );
    } else if (userRole === 'purchase') {
      // Render purchase-related menu items for purchase role
      return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[location.pathname]}>
          {/* ... Purchase menu items */}
          <SubMenu key="1" icon={<FileOutlined />} title="Purchase">
            <Menu.Item key="1.1">
              <Link to="/purchase/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="1.2">
              <Link to="/purchase/invoices">Invoices</Link>
            </Menu.Item>
            <Menu.Item key="1.3">
              <Link to="/purchase/good-receiving">Goods Receiving</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout} >
            LogOut
          </Menu.Item>
        </Menu>
      );
    } else if (userRole === 'accounts') {
      // Render accounts-related menu items for accounts role
      return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[location.pathname]}>
          {/* ... Accounts menu items */}
          <SubMenu key="1" icon={<BankOutlined />} title="Accounts">
            <Menu.Item key="1.1">
              <Link to="/accounts/expense">Expense</Link>
            </Menu.Item>
            <Menu.Item key="1.2">
              <Link to="/accounts/journal-entry">Journal Entry</Link>
            </Menu.Item>
            <Menu.Item key="1.3">
              <Link to="/accounts/chartofaccounts">Chart Of Accounts</Link>
            </Menu.Item>
            <Menu.Item key="1.4">
              <Link to="/accounts/bank-accounts">Bank Accounts</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout} >
            LogOut
          </Menu.Item>
        </Menu>
      );
    } else if (userRole === 'inventory') {
      // Render inventory-related menu items for inventory role
      return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[location.pathname]}>
          {/* ... Inventory menu items */}
          <SubMenu key="1" icon={<ToolOutlined />} title="Inventory">
            <Menu.Item key="1.1">
              <Link to="/inventory/stock-movement">Stock Movement</Link>
            </Menu.Item>
            <Menu.Item key="1.2">
              <Link to="/inventory/stock-adjustment">Stock Adjustment</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout} >
            LogOut
          </Menu.Item>
        </Menu>
      );
    } else {
      // Render an empty menu if the user role is not recognized
      return null;
    }
  };
  return (

    <Router>

      <Switch>

        <Route exact path="/">
          {isAuthenticated ? (
            <>
            <Layout style={{ minHeight: '100vh' }}>
               
              <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>

                <div className="logo" style={{ height: '120px', margin: '50px' }}>
                  <img src={logo} alt="AIA Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                </div>
                {renderMenuItems()}

              </Sider>
              

                <Layout>


                  <Header style={{ background: '#fff', padding: '0 16px' }} />
                  <Content style={{ margin: '0 16px' }}>

                  </Content>
                  <Footer style={{ textAlign: 'center' }}>
                    Apparel Industry Automation ©2023 Created by Ifrah, Hiza, Afsheen and Amina
                  </Footer>
                </Layout>
              </Layout>
            </>
          ) : (
            <LandingPage />
          )}
        </Route>



        <Route exact path="/" component={Dashboard} />
        <Route exact path="/reset-password" component={ForgotPassword} />
        <Route exact path="/forgot-password" component={ResetPassword} />

        <Route exact path="/sales/orders" component={SalesOrders} />
        <Route exact path="/sales/invoices" component={SalesInvoice} />
        <Route exact path="/sales/delivery" component={SalesDelivery} />
        <Route exact path="/sales/add-order" component={AddOrder} />
        <Route exact path="/sales/add-invoice" component={AddInvoice} /> // add route for AddInvoice component
        <Route exact path="/sales/add-delivery" component={AddDelivery} />
        <Route exact path="/sales/receivemoney" component={ReceiveMoney} />


        <Route path="/purchase/orders" component={PurchaseOrder} />
        <Route path="/purchase/invoices" component={PurchaseInvoice} />
        <Route path="/purchase/good-receiving" component={PurchaseGoodReceiving} />


        <Route path="/accounts/expense" component={Expense} />
        <Route path="/add-expense/:id" component={AddExpense} />
        <Route path="/ViewExpense/:id" component={ViewExpense} />
        <Route path="/accounts/bank-accounts" component={BankAccounts} />
        {/*<Route path="/accounts/debit-note" component={DebitNote} />
<Route path="/accounts/bank-deposit" component={BankDeposit} />
<Route path="/accounts/credit-note" component={CreditNote} />*/}
        <Route path="/accounts/chartofaccounts" component={chartofaccounts} />
        <Route path="/add-account/:id" component={AddAccount} />
        <Route path="/ViewAccount/:id" component={ViewAccount} />
        <Route path="/add-bankaccount/:id" component={AddBankAccount} />
        <Route path="/ViewBankAccount/:id" component={ViewBankAccount} />
        <Route path="/add-entry/:id" component={AddJournalEntry} />
        <Route path="/ViewJournalEntry/:id" component={ViewJournalEntry} />
        <Route path="/accounts/journal-entry" component={JournalEntry} />

        <Route path="/inventory/stock-movement" component={StockMovement} />
        <Route path="/add-stockmovement/:id" component={AddStockMovement} />
        <Route path="/ViewStockMOvement/:id" component={ViewStockMovement} />
        <Route path="/inventory/stock-adjustment" component={StockAdjustment} />
        <Route path="/add-stockAdjustment/:id" component={AddStockAdjustment} />
        <Route path="/ViewStockAdjustment/:id" component={ViewStockAdjustment} />
        {/*<Route path="/inventory/assembling" component={Assembling} />
<Route path="/inventory/disassembling" component={Disassembling} />*/}

        <Route path="/SetUp/Customers" component={Customers} />
        <Route path="/add-customer/:id" component={AddCustomer} />
        <Route path="/ViewCustomer/:id" component={ViewCustomer} />
        <Route path="/SetUp/Product" component={Product} />
        <Route path="/add-Product/:id" component={AddProduct} />
        <Route path="/ViewProduct/:id" component={ViewProduct} />
        <Route path="/SetUp/Warehouse" component={Warehouse} />

        <Route path="/Users/UsersList" component={UsersList} />
        <Route path="/Users/RoleAssignment" component={RoleAssignment} />

      </Switch>
    


    </Router>

  );
};

export default App;

