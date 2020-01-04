import React from 'react';
import App from 'next/app';
import { AuthProvider } from '../context/auth-context';

import '../styles/main.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}

export default MyApp;
