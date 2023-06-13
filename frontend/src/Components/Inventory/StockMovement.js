
import React, { Component } from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Space } from 'antd';

class StockMovement extends Component {
    constructor(props){
        super(props)
        this.state={
            
        stockmovements:[]
        }
        this.addstockmovement=this.addstockmovement.bind(this);
    }

      
    async componentDidMount() {
        const response = await axios.get('http://localhost:8080/api/stockmovements');
        this.setState({ stockmovements: response.data });
      }
      async deletestockmovement(id) {
        try {
            await axios.delete(`http://localhost:8080/api/stockmovements/${id}`);
            this.setState(prevState => ({ 
              ...prevState,
              stockmovements: prevState.stockmovements.filter(stockmovements => stockmovements.id !== id)
            }));
        } catch (error) {
          console.log(error);
        }
      }
      addstockmovement(){
        this.props.history.push('/add-stockmovement/_add');/*/-1*/
    } 
    
    render() {
        
        const columns = [
          {
            title: 'Number',
            dataIndex: 'id',
            key: 'id',
            render: (text, stockmovement) => {
              return (<div><a href={`/ViewStockMovement/${stockmovement.id}`}>
              {stockmovement.id}
            </a></div>);
             },
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
              },
            {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
           
            },
           
            {
            title: 'From Warehouse',
            dataIndex: 'fromWarehouse',
            key: 'fromWarehouse',
            },
            {
                title: 'To Warehouse',
                dataIndex: 'toWarehouse',
                key: 'toWarehouse',
                },
            
            {
            title: 'Actions',
            key: 'action',
            render: (text, stockmovement) => (
            <Space size="middle">
            <div onClick={ () => this.deletestockmovement(stockmovement.id)}><DeleteForever/></div>
            </Space>
            ),
            },
            ];

        return (
            <div>
            <h2 className="text-center">Stock Movements</h2> 
            <Button type="primary" onClick={this.addstockmovement}>Add Stock Movement</Button>          
            <div >
            <Table dataSource={this.state.stockmovements} columns={columns} />             
                
            </div>
            
         </div>
        );
    }
}

export default StockMovement;
