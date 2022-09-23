import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import RouteProtector from './components/RouteProtector';
import LoginScreen from './screens/login/';
import RegisterScreen from './screens/register/';
import MenuScreen from './screens/menu/';
import Template from './components/Template';
import { AuthProvider } from './providers/AuthProvider';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Template />}>
                            {/* COMPLETER COMME L'EXEMPLE CI-DESSOUS */}
                            {/* <Route path="/test" element={<Test/>}/> */}
                            <Route path="/reservations" />
                            <Route
                                path="/menus"
                                element={
                                    <RouteProtector>
                                        <MenuScreen />
                                    </RouteProtector>
                                }
                            />
                            <Route path="/mark" />
                            <Route
                                path="/register"
                                element={<RegisterScreen />}
                            />
                            <Route path="/login" element={<LoginScreen />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}
export default App;
