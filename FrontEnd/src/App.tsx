//importar redireccionadores a las rutas
import { Routes, Route } from 'react-router-dom'
//importar estilos
import './App.css'
import { AuthProvider } from './Context/AuthContext'; // ✅ Correcto
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';



//rutas por crear SEBASTIAN MUÑOZ

import LoginEmail from './Components/LoginEmail/LoginEmail.tsx' //--> Muckup Iniciar Sesion - correo
import LoginPassword from './Components/LoginPassword/LoginPassword.tsx' //--> Muckup Iniciar-contraseña


//Rutas por crear SAMUEL ALVAREZ

import Suscription from './Components/Suscription/Suscription.tsx' //--> Muckup Suscripcion
import Register from './Components/Register/MainRegister.tsx'  //--> Mcukup Registrar
import RegisterPassword from './Components/Register/RegisterPassword/RegisterPassword.tsx' //--> Muckup Registro-contraseña

//Rutas por crear CABALLERO
import ProductCard from './Components/ProductCart/ProductCart.tsx' //--> Muckup Landing Page
import Profile from './Components/Profile/Profile.tsx' //--> Muckup Perfil
import LoginNavbar from './Components/LoginNavbar/LoginNavbar.tsx'
import Menu from './Components/LoggedNav/LoggedNav.tsx'
import Manuals from './Components/Manuals/Manual.tsx'


//Rutas por crear JULIANA MORALES
import PasswordRecovery from './Components/PasswordRecovery/PasswordRecovery.tsx' //--> Muckup Recuperacion- constraseña
import ConfirmPassword from './Components/ConfirmPassword/ConfirmPassword.tsx' //--> Muckup Confirmar-verficacion

//Rutas por crear BRAYAN
//import Purchases from './Components/Purchases/Purchases.tsx' //--> Muckup Mis ventas
//import Sales form './Components/Sales/Sales.tsx' //--> Muckup Mis ventas
//import Preview from './Components/Preview/Preview.tsx' //--> Muckup Previzualizacion
//import PublicarProducto from './Components/PublicarProducto/Publicar.jsx'

//Rutas por crear JULIANA MORALES
//import PasswordRecovery from './Components/PasswordRecovery/PasswordRecovery.tsx' //--> Muckup Recuperacion- constraseña
//import ConfirmPassword from './Components/ConfirmPassword/ConfirmPassword.tsx' //--> Muckup Confirmar-verficacion

//Rutas por crear BRAYAN
import Purchases from './Components/Purchases/Purchases.tsx' //--> Muckup Mis ventas
import Sales from './Components/Sales/Sales.tsx' //--> Muckup Mis ventas
import OnSale from './Components/OnSale/OnSale.tsx' //--> Muckup Previzualizacion
import ProductRegistrationForm from './Components/PublicarTest/PublicarTest.tsx'


function App() {
  
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path='/' element={
            <LoginNavbar>
              <ProductCard/>
            </LoginNavbar>
          } />
          <Route path='/LoginEmail' element={<LoginEmail/>} />
          <Route path='/LoginEmail/LoginPassword' element={<LoginPassword/>} />
          <Route path='/Register' element={<Register/>} />
          <Route path='/Register/RegisterPassword' element={<RegisterPassword/>} />
          <Route path='/PasswordRecovery' element={<PasswordRecovery/>} />
          <Route path='/PasswordRecovery/ConfirmPassword' element={<ConfirmPassword/>} />

          {/* Rutas protegidas */}
          <Route path='/Profile/:cedula' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          <Route path='/logged/:username' element={
            <PrivateRoute>
              <Menu>
                <ProductCard/>
              </Menu>
            </PrivateRoute>
          } />

          <Route path='/Purchases' element={
            <PrivateRoute>
              <Purchases/>
            </PrivateRoute>
          } />

          <Route path='/Sales' element={
            <PrivateRoute>
              <Sales/>
            </PrivateRoute>
          } />

          <Route path='/OnSale' element={
            <PrivateRoute>
              <OnSale/>
            </PrivateRoute>
          } />

          <Route path='/PublicarProducto' element={
            <PrivateRoute>
              <ProductRegistrationForm />
            </PrivateRoute>
          } />

          <Route path='/Suscription' element={
            <PrivateRoute>
              <Suscription/>
            </PrivateRoute>
          } />

          {/* Añadir la ruta para Manuals */}
          <Route path='/manuals' element={
            <PrivateRoute>
              <Manuals />
            </PrivateRoute>
          } />

        </Routes>
      </AuthProvider>
    </>
  )
}

export default App

