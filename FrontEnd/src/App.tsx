//importar redireccionadores a las rutas
// 
// //importar estilos
import './App.css'


//rutas por crear SEBASTIAN MUÑOZ
//import LoginEmail from './Components/LoginEmail/LoginEmail.tsx' //--> Muckup Iniciar Sesion - correo
//import LoginPassword from './Components/LoginPassword/LoginPassword.tsx' //--> Muckup Iniciar-contraseña
// import LoginEmail from './Components/LoginEmail/LoginEmail.tsx' //--> Muckup Iniciar Sesion - correo
// import LoginPassword from './Components/LoginPassword/LoginPassword.tsx' //--> Muckup Iniciar-contraseña


//Rutas por crear SAMUEL ALVAREZ
// import Suscription from './Components/Suscription/Suscription.tsx' //--> Muckup Suscripcion
//import Register from './Components/Register/Register.tsx'  //--> Mcukup Registrar
//import Suscription from './Components/Suscription/Suscription.tsx' //--> Muckup Suscripcion
// import Register from './Components/Register/MainRegister.tsx'  //--> Mcukup Registrar
//import RegisterPassword from './Components/RegisterPassword/RegisterPassword.tsx' //--> Muckup Registro-contraseña

//Rutas por crear CABALLERO
// import ProductCard from './Components/ProductCart/ProductCart.tsx' //--> Muckup Landing Page
// import Profile from './Components/Profile/Profile.tsx' //--> Muckup Perfil
import LoginNavbar from './Components/LoginNavbar/LoginNavbar.tsx'
import Menu from './Components/LoggedNav/LoggedNav.tsx'
//Rutas por crear JULIANA MORALES
//import PasswordRecovery from './Components/PasswordRecovery/PasswordRecovery.tsx' //--> Muckup Recuperacion- constraseña
//import ConfirmPassword from './Components/ConfirmPassword/ConfirmPassword.tsx' //--> Muckup Confirmar-verficacion

//Rutas por crear BRAYAN
//import Purchases from './Components/Purchases/Purchases.tsx' //--> Muckup Mis ventas
//import Sales form './Components/Sales/Sales.tsx' //--> Muckup Mis ventas
//import Preview from './Components/Preview/Preview.tsx' //--> Muckup Previzualizacion
//import PublicarProducto from './Components/PublicarProducto/Publicar.jsx'

//Rutas por crear JULIANA MORALES
//import PasswordRecovery from './Components/PasswordRecovery/PasswordRecovery.tsx' //--> Muckup Recuperacion- constraseña
//import ConfirmPassword from './Components/ConfirmPassword/ConfirmPassword.tsx' //--> Muckup Confirmar-verficacion

//Rutas por crear BRAYAN
// import Purchases from './Components/Purchases/Purchases.tsx' //--> Muckup Mis ventas
// import Sales from './Components/Sales/Sales.tsx' //--> Muckup Mis ventas
// import OnSale from './Components/OnSale/OnSale.tsx' //--> Muckup Previzualizacion
// import ProductRegistrationForm from './Components/PublicarTest/PublicarTest.tsx'


function App() {

  return (
    <>
      <Routes>
        {/* --> SEBASTIAN CABALLERO*/}
        <Route path='/' element={
          <LoginNavbar >
            {/* <ProductCard/> */}
          </LoginNavbar >
          } />
        <Route path='/Profile' element={<Profile/>} />        
        {/* <Route path='/Profile' element={<Profile/>} /> */} 
        <Route path='/logged' element={   
          <Menu>
            {/* <ProductCard/>   */}
          </Menu>
          } /> 
          
        
        {/* --> SEBASTIAN MUÑOZ*/}
        {/* <Route path='/LoginEmail' element={<LoginEmail/>} /> */}
        {/* <Route path='/LoginEmail/LoginPassword' element={<LoginPassword/>} /> */}

      
        {/* --> SEBASTIAN MUÑOZ*/}
        {/* <Route path='/LoginEmail' element={<LoginEmail/>} />  */}
        {/* <Route path='/LoginEmail/LoginPassword' element={<LoginPassword/>} /> */}


        {/* --> SAMUEL ALVAREZ */}
        {/* <Route path='/Suscription' element={<Suscription/>} /> */}
        {/*<Route path='/Register' element={<Register/>} />*/}
        {/* <Route path='/Register/RegisterPassword' element={<RegisterPassword/>} /> */}  
        {/* <Route path='/Suscription' element={<Suscription/>} /> */}
        {/* <Route path='/Register' element={<Register/>} /> */}
        {/* <Route path='/Register/RegisterPassword' element={<RegisterPassword/>} />   */}
        
        
        {/* --> JULIANA MORALES */}
        {/* <Route path='/PasswordRecovery' element={<PasswordRecovery/>} /> */}
        {/* <Route path='/PasswordRecovery/ConfirmPassword' element={<ConfirmPassword/>} /> */} 
        
        {/* --> BRAYAN */}
        {/* <Route path= '/Purchases' element={<Purchases/>}/>
        <Route path= '/Sales' element={<Sales/>}/>
        {/* <Route path= '/Purchases/Preview' element={<Preview/>}/>  */}
        {/* <Route path= '/OnSale' element={<OnSale/>}/>
        <Route path='/PublicarProducto' element={<PublicarProducto />}} */}
        {/* <Route path= '/Purchases' element={<Purchases/>}/>
        <Route path= '/Sales' element={<Sales/>}/>
        <Route path= '/OnSale' element={<OnSale/>}/>
        <Route path='/PublicarProducto' element={<ProductRegistrationForm />} /> */}
        
        
      </Routes>
    </>
  )
}

export default App

