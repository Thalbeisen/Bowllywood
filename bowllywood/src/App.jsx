import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import RouteProtector from './components/RouteProtector';
import LoginScreen from './screens/login/';
import RegisterScreen from './screens/register/';
import MenuScreen from './screens/menu/';
import MealScreen from './screens/meal/';
import Template from './components/Template';
import { AuthProvider } from './providers/AuthProvider';
import AddFranchiseRequestScreen from './screens/addFranchiseRequest';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Router>
                    <Routes>
                      <Route path="/" element={<Template/>}>
                        {/* COMPLETER COMME L'EXEMPLE CI-DESSOUS */}
                        {/* <Route path="/test" element={<Test/>}/> */}
                        <Route path="/" />
                        <Route path="/reservations" />
                        <Route
                                path="/menus"
                                element={
                                    <RouteProtector>
                                        <MenuScreen />
                                    </RouteProtector>
                                }
                            />
                        <Route path="/menus" element={<MenuScreen />} />
                        <Route path="/menus/desserts" element={<MenuScreen bowlsType='SUCRE'/>} />
                        <Route path="/menus/:id" element={<MealScreen />} />
                        <Route path="/mark" />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/login" element={<LoginScreen />}/>
                        <Route path="/franchise-request" element={<AddFranchiseRequestScreen/>}/>
                      </Route>
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}
export default App;
