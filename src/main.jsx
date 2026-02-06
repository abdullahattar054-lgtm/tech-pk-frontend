import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { store } from './redux/store';
import './styles/globals.css';
import GoogleAuthWrapper from './components/GoogleAuthWrapper';
import 'react-toastify/dist/ReactToastify.css';

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', savedTheme === 'dark');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleAuthWrapper>
                <BrowserRouter>
                    <App />
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme={savedTheme}
                    />
                </BrowserRouter>
            </GoogleAuthWrapper>
        </Provider>
    </React.StrictMode>
);
