
// SalesComponent.js
import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import OrdersComponent from './Order';
import InvoicesComponent from './Invoice';
import ReceiveMoney from './ReceiveMoney';
import Delivery from './Delivery';

const SalesComponent = ({ match }) => {
  const { path } = match;

  return (
    <div>
      <h1>Sales Component</h1>
      <nav>
        <ul>
          <li>
            <Link to={`${path}/orders`}>Orders</Link>
          </li>
          <li>
            <Link to={`${path}/invoices`}>Invoices</Link>
          </li>
          <li>
            <Link to={`${path}/receivemoney`}>ReceiveMoney</Link>
          </li>
          <li>
            <Link to={`${path}/delivery`}>Delivery</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={`${path}/orders`} component={OrdersComponent} />
        <Route path={`${path}/invoices`} component={InvoicesComponent} />
        <Route path={`${path}/receivemoney`} component={ReceiveMoney} />
        <Route path={`${path}/delivery`} component={Delivery} />
        <Redirect to={`${path}/orders`} />
      </Switch>
    </div>
  );
};

export default SalesComponent;
