
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';


import Template from './components/Template';

function App() {
    return (
        <div className="App">
            <Router>
                    <Routes>
                      <Route path="/" element={<Template/>}>
                        {/* COMPLETER COMME L'EXEMPLE CI-DESSOUS */}
                        {/* <Route path="/test" element={<Test/>}/> */}
                        <Route path="/reservation" />
                        <Route path="/menu" />
                        <Route path="/mark" />
                        <Route path="/register" />
                        <Route path="/login" />
                        </Route>
                    </Routes>
            </Router>
        </div>
    );

export default App;
