'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import { userInfo } from 'os';
import { Layout}from 'antd';
const { Header, Content, Sider } = Layout;

import Logo from './components/Logo'
import Info from './components/Info'
import BookTable from './components/BookTable'
import DisplayBook from './components/DisplayBook'
import Log from './components/Log'
import ShoppingCart from './components/ShoppingCart'
import UserInfo from './components/UserInfo'
import ManageBook from './components/ManageBook'
import ManageUser from './components/ManageUser'
import Statistics from './components/Statistics'



var category = localStorage.getItem('category');
var headers = localStorage.getItem('headers');

if (!headers) {
  category = ['Poem', 'Fiction', 'Story','Textbook'];
  headers = ['title','author','price','publish','        '];
}

ReactDOM.render(
  <Layout className="layout">
        <Header className="header">
          <Info/>
        </Header>
        <Layout className="content">
          <BookTable category={category} headers={headers}/>
          <DisplayBook />
          <ShoppingCart />
          <UserInfo />
          <Log />
          <ManageBook />
          <ManageUser />
          <Statistics/>
        </Layout>
  </Layout>,
  document.getElementById('app')
);