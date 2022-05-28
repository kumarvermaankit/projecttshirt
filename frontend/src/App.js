import React from 'react'
import { Container } from 'react-bootstrap'
// Routing
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Screens
import HomeScreen from './screens/Home'
import ProductScreen from './screens/Product'
import CartScreen from './screens/Cart'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import ProfileScreen from './screens/Profile'
import ShippingScreen from './screens/Shipping'
import PaymentScreen from './screens/Payment'
import PlaceOrderScreen from './screens/PlaceOrder'
import OrderScreen from './screens/Order'
import Customize from "./screens/Customize"
import Custom from "./screens/custom"
// History
import history from './utils/history'

const App = () => {
    return (
        <Router history={history}>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                    <Route path='/order/:id' element={<OrderScreen />} />
                    <Route path='/place-order' element={<PlaceOrderScreen />} />
                    <Route path='/payment' element={<PaymentScreen />} />
                    <Route path='/shipping' element={<ShippingScreen />} />
                    <Route path='/register' element={<RegisterScreen />} />
                    <Route path='/profile' element={<ProfileScreen />} />
                    <Route path='/login' element={<LoginScreen />}  />
                    <Route path='/product/:id' element={<ProductScreen />} />
                    <Route path='/cart/:id?' element={<CartScreen />} />
                    <Route path='/' element={<HomeScreen />} exact />
                    <Route path="/customize" element={<Customize />} exact />
                    <Route path="/custom" element={<Custom />} exact />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
