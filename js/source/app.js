'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import { userInfo } from 'os';

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
  <div className="layout">
    <div className="header">
      <Logo/>
      <Info/>
    </div>
    <div className="content">
      <BookTable category={category} headers={headers}/>
      <DisplayBook/>
      <ShoppingCart/>
      <UserInfo/>
      <Log/>
      <ManageBook/>
      <ManageUser/>
        <Statistics/>
    </div>    
  </div>,
  document.getElementById('app')
);