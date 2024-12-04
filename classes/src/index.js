import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App nome="Igor" />
    <button className="btn btn-outline-danger w-100 mt-2"
      onClick={() =>
        root.unmount()}>
      Unmount
    </button>
  </>
);