import React, { ReactElement } from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import './index.css';

interface IProps {
  children: ReactElement
}

const Layout: React.FC<IProps> = ({ children }) =>{
  return (
    <div>
      <Header />
      <div className='layout-container'>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout