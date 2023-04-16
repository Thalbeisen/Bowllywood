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
import GetUserFranchiseRequestsScreen from './screens/getUserFranchiseRequests';
import ProfileScreen from './screens/profiles/ProfileScreen';
import HomeScreen from './screens/home/HomeScreen';
import FranchiseRequestDetailsScreen from './screens/franchiseRequestDetails';
import FranchiseRequestEditScreen from './screens/franchiseRequestEditScreen';
import FranchiseRequestCancelScreen from './screens/franchiseRequestCancelScreen';
import AddEditMealScreen from './screens/addEditMeal/';
import MaintenanceScreen from './screens/maintenance/';
import ErrorScreen from './screens/errorScreen/';
import { ToastContainer } from 'react-toastify';
import Popup from 'react-popup';
import ReservationForm from "./screens/reservation/ReservationForm";
import ReservationDetail from "./screens/reservation/ReservationDetail";
import ReservationList from "./screens/reservation/ReservationList";
import AdminListMeals from './screens/adminListMeals';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Router>
                    <Routes>
                      <Route path="/" element={<Template/>}>
                        <Route path="/" element={<HomeScreen />}/>
                        <Route element={<RouteProtector permittedRoles={['ROLE_USER', 'ROLE_WAITER', 'ROLE_MANAGER', 'ROLE_CEO']} />}>
                            <Route path="/reservations/form" element={<ReservationForm />} />
                            <Route path="/reservations/form/:id"element={<ReservationForm action="EDIT" />} />
                            <Route path="/reservations/:id" element={<ReservationDetail />} />
                        </Route>
                        <Route path="/reservations" element={
                            <RouteProtector permittedRoles={['ROLE_USER', 'ROLE_WAITER', 'ROLE_MANAGER', 'ROLE_CEO']} >
                                <ReservationList />
                            </RouteProtector>
                        } />
                       <Route path="/menus" element={<MenuScreen />} />
                       <Route path="/menus/desserts" element={<MenuScreen bowlsType='SUCRE'/>} />
                       <Route path="/menus/admin-list" element={
                          <RouteProtector permittedRoles={['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_CEO', 'ROLE_MANAGER', 'ROLE_COOK', 'ROLE_WAITER']}>
                             <AdminListMeals />
                          </RouteProtector> } />
                       <Route element={<RouteProtector permittedRoles={['ROLE_ADMIN']} />}>
                          <Route path="/menus/create" element={<AddEditMealScreen action='ADD' />} />
                          <Route path="/menus/edit/:id" element={<AddEditMealScreen action='EDIT' />} />
                       </Route>
                       <Route path="/menus/:id" element={<MealScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/login" element={<LoginScreen />}/>
                        <Route path="/franchise-request" element={<AddFranchiseRequestScreen/>}/>
                        <Route path="/my-franchise-requests/:id" element={<FranchiseRequestDetailsScreen/>} />
                        <Route path="/my-franchise-requests/edit/:id" element={<FranchiseRequestEditScreen/>} />
                        <Route path="/my-franchise-requests/cancel/:id" element={<FranchiseRequestCancelScreen/>} />
                        <Route path="/my-franchise-requests" element={<GetUserFranchiseRequestsScreen/>}/>
                        <Route path="/profile" element={<ProfileScreen/>}/>
                        <Route path="/reviews" element={<MaintenanceScreen/>}/>
                        <Route path="/restaurantList" element={<MaintenanceScreen/>}/>
                        <Route path="/erreur" element={<ErrorScreen />}/>
                        <Route path="*" element={<ErrorScreen errCode={404} errText="La page demandée n'existe pas. Veuillez recommencer ou retourner sur la pge d'accueil." />}/>
                      </Route>
                    </Routes>
                </Router>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored" />
                <Popup />
            </div>
        </AuthProvider>
    );
}
export default App;
