
import React, { Component } from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Space } from 'antd';

class userslist extends Component {
    constructor(props){
        super(props)
        this.state={
            productCode:'user',
            users:[]
        }
        this.adduser=this.adduser.bind(this);
    }
    async componentDidMount() {
        const response = await axios.get('http://localhost:8080/api/users');
        this.setState({ users: response.data });
      
     
      }
    adduser(){
        this.props.history.push('/Users/RoleAssignment');/*/-1*/
    }    
    async deleteuser(id) {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            this.setState(prevState => ({ 
              ...prevState,
              users: prevState.users.filter(user => user.id !== id)
            }));
        } catch (error) {
          console.log(error);
        }
      }
      
    
    render() {
        
        const columns = [
           
            {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
                {text || 'Not Exists'}
            </span>
            ),
            },
            {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            },
            {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            },
            
            {
            title: 'Actions',
            key: 'action',
            render: (text, user) => (
            <Space size="middle">
            <div onClick={ () => this.deleteuser(user.id)}><DeleteForever/></div>
            </Space>
            ),
            },
            ];

        return (
            <div>
            <h2 className="text-center">Entries List</h2> 
            <Button type="primary" onClick={this.adduser}>Add User</Button>          
            
            <div >
            <Table dataSource={this.state.users} columns={columns} />             
                
            </div>
         </div>
        );
    }
}

export default userslist;



