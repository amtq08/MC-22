import React, { Component } from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Space } from 'antd';

class JournalEntry extends Component {
    constructor(props){
        super(props)
        this.state={
            productCode:'je',
            entries:[]
        }
        this.addentry=this.addentry.bind(this);
    }
    async componentDidMount() {
        const response = await axios.get('http://localhost:8080/api/journal-entries');
        this.setState({ entries: response.data });
      
        const res = await axios.get('http://localhost:8080/api/journal-entries/servicecode');
        this.setState({ productCode: res.data });
      }
    addentry(){
        this.props.history.push('/add-entry/_add');/*/-1*/
    }    
    async deleteEntry(id) {
        try {
            await axios.delete(`http://localhost:8080/api/journal-entries/${id}`);
            this.setState(prevState => ({ 
              ...prevState,
              entries: prevState.entries.filter(entry => entry.id !== id)
            }));
        } catch (error) {
          console.log(error);
        }
      }
      
    
    render() {
        
        const columns = [
            {
            title: 'Number',
            dataIndex: 'id',
            key: 'id',
            render: (text, entry) => {
               return (<div><a href={`/ViewJournalEntry/${entry.id}`}>
               {`${this.state.productCode}-${entry.id}`}
             </a></div>);
              },
            },
            {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            },
            {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            },
            {
            title: 'Reference',
            dataIndex: 'referenceNumber',
            key: 'referenceNumber',
            },
            {
            title: 'Amount',
            dataIndex: 'balance',
            key: 'balance',
            },
            {
            title: 'Actions',
            key: 'action',
            render: (text, entry) => (
            <Space size="middle">
            <div onClick={ () => this.deleteEntry(entry.id)}><DeleteForever/></div>
            </Space>
            ),
            },
            ];

        return (
            <div>
            <h2 className="text-center">Entries List</h2> 
            <Button type="primary" onClick={this.addentry}>Add Journal Entry</Button>          
            
            <div >
            <Table dataSource={this.state.entries} columns={columns} />             
                
            </div>
         </div>
        );
    }
}

export default JournalEntry;
