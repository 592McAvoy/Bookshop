'use strict';

import Logo from './components/Logo'
import Info from './components/Info'
import BookTable from './components/BookTable'
import Log from './components/Log'
import ShoppingCart from './components/ShoppingCart'
import UserInfo from './components/UserInfo'
import ManageBook from './components/ManageBook'
import ManageUser from './components/ManageUser'

import React from 'react';
import ReactDOM from 'react-dom';
import { userInfo } from 'os';

var category = localStorage.getItem('category');
var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');

if (!headers) {
  category = ['Poem', 'Fiction', 'Story','Textbook'];
  headers = ['title','auther','price','publish','        '];
  data = [
    {category:"Poem",title:"Ice Rain",auther:"Alan",price:21,publish:2001,stock:13},
    {category:"Poem",title:"Homeland",auther:"Mimi",price:44,publish:2011,stock:6},
    {category:"Fiction",title:"Cut me off",auther:"Alan",price:92,publish:2008,stock:2},
    {category:"Story",title:"Grind me down",auther:"BBan",price:67,publish:2000,stock:9},
    {category:"Fiction",title:"Moon river",auther:"BBan",price:127,publish:2004,stock:5},
    {category:"Poem",title:"Your hair",auther:"Alan",price:27,publish:2014,stock:14},
    {category:"Poem",title:"Homeland2",auther:"Mimi",price:44,publish:2013,stock:9},
    {category:"Fiction",title:"Shinning",auther:"Corn",price:112,publish:2003,stock:6},
    {category:"Story",title:"Song to you",auther:"CanCan",price:45,publish:2010,stock:9},
    {category:"Textbook",title:"CSSAPP",auther:"Yuanzhang",price:227,publish:2014,stock:5},
    {category:"Textbook",title:"Database System",auther:"JBoss",price:149,publish:2017,stock:14},
    {category:"Poem",title:"Kitty",auther:"ling",price:84,publish:2013,stock:2},
    {category:"Story",title:"Code code",auther:"Fanni",price:134,publish:2015,stock:3}
  ];
}

ReactDOM.render(
  <div className="layout">
    <div className="header">
      <Logo/>
      <Info/>
    </div>
    <div className="content">
      <BookTable category={category} headers={headers} initialData={data}/>
      <ShoppingCart/>
      <UserInfo/>
      <Log/>
      <ManageBook/>
      <ManageUser/>
    </div>    
  </div>,
  document.getElementById('app')
);