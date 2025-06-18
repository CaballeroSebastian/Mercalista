import type React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import { Link, useNavigate, useParams } from "react-router-dom"
import { type ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { CircleChevronRight } from "lucide-react"

import "./LoggedNav.css"

import logo from "../../assets/Image/logo.png"
import ventasIcon from "../../assets/Icons/Ventas.png"
import premiumIcon from "../../assets/Icons/Premium.png"
import comprasIcon from "../../assets/Icons/Compras.png"
import Carrito from "./assetsLogged/carrito.png"
import notificacion from "./assetsLogged/notificacion.png"
import usuario from "./assetsLogged/usuario.png"
import chat from "./assetsLogged/chat.png"
import logOut from "./assetsLogged/cerrar-sesion.png"
import vendidoP from "./assetsLogged/iconsWhite/VendidoPwhite.png"
import ventaP from "./assetsLogged/iconsWhite/VentaPwhite.png"
import { useAuth } from "../../Context/AuthContext"
import Footer from "../footer/Footer"

type NavBarPropsLogged = {
  children?: ReactNode
}

const Menu = ({ children }: NavBarPropsLogged) => {
  const { logout, user, accessToken } = useAuth()
  const navigate = useNavigate()
  const { username } = useParams<{ username: string }>()

  useEffect(() => {
    if (window.location.pathname.startsWith("/logged/") && user?.username !== username) {
      navigate(`/logged/${user?.username}`)
    }
  }, [user, username, navigate])

  // Si el usuario tiene imagen de perfil, úsala; si no, usa la imagen por defecto
  const userProfileImg = user?.image_profile
    ? user.image_profile.startsWith("http")
      ? `${user.image_profile}?${Date.now()}`
      : `http://127.0.0.1:8000${user.image_profile}?${Date.now()}`
    : usuario

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  // Función para actualizar la imagen de perfil
  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files || e.target.files.length === 0 || !user || !accessToken) return
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image_profile", file)

    try {
      await axios.patch(`http://127.0.0.1:8000/profile/${user.cedula}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      // Vuelve a pedir los datos del usuario para actualizar la imagen en el contexto
      const response = await axios.get(`http://127.0.0.1:8000/profile/${user.cedula}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      // Actualiza el usuario en el contexto
      localStorage.setItem("userData", JSON.stringify(response.data))
      window.location.reload() // O actualiza el estado global si tienes un método para ello
    } catch (err) {
      alert("Error al subir la foto de perfil")
    }
  }

  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [categoryCounts, setCategoryCounts] = useState<{[key: string]: number}>({});

  const handleCategoryClick = (category: string) => {
    // Si la categoría seleccionada es la misma, deseleccionar
    const newCategory = selectedCategory === category ? "" : category
    setSelectedCategory(newCategory)

    // Emitir evento personalizado
    const event = new CustomEvent("categoryChange", {
      detail: { category: newCategory },
    })
    window.dispatchEvent(event)
  }

  const handlePriceFilter = () => {
    const event = new CustomEvent('priceChange', {
      detail: { 
        minPrice: minPrice || 0,
        maxPrice: maxPrice || Infinity 
      }
    });
    window.dispatchEvent(event);
  };

  // Escuchar actualizaciones de conteo de categorías
  useEffect(() => {
    const handleCategoryCounts = (event: CustomEvent<{[key: string]: number}>) => {
        setCategoryCounts(event.detail);
    };

    window.addEventListener('categoryCountsUpdate', handleCategoryCounts as EventListener);
    
    return () => {
        window.removeEventListener('categoryCountsUpdate', handleCategoryCounts as EventListener);
    };
  }, []);

  // Agregar este console.log para verificar
  console.log("Tipo de usuario:", user?.tipousuario)

  return (
    <div className="menu-container">
      <nav id="barraLateral" className="border-right d-none d-md-block">
        <div className="barra-fija">
          <div className="navbar-brand p-3">
            <Link to={`/logged/${user?.username}`}>
              <img className="logo" src={logo || "/placeholder.svg"} alt="Mercalista" />
            </Link>
          </div>
          <ul className="nav flex-column" id="nav-horizontal">
            {/* Condición corregida para el botón Mis Productos */}
            {/* {user && user.tipousuario === 'vendedor' && ( */}
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <img className="icon" src={ventasIcon || "/placeholder.svg"} alt="Premium" />
                Mis Productos
              </a>
              <div className="collapse" id="collapseExample">
                <div className="card-productos card card-body">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link to="/OnSale" className="nav-link">
                        <img className="iconP" src={ventaP || "/placeholder.svg"} alt="Premium" />
                        En Venta
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Sales" className="nav-link">
                        <img className="iconP" src={vendidoP || "/placeholder.svg"} alt="Premium" />
                        Vendidos
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* )} */}
            <li className="nav-item">
              <Link to="/Suscription" className="nav-link" style={{ color: "rgb(255, 238, 0)" }}>
                <img className="icon" src={premiumIcon || "/placeholder.svg"} alt="Premium" />
                Premium
              </Link>
            </li>
            {/* {user && user.tipousuario === 'comprador' && ( */}
            <li className="nav-item">
              <Link to="/Purchases" className="nav-link">
                <img className="icon" src={comprasIcon || "/placeholder.svg"} alt="Compras" />
                Mis Compras
              </Link>
            </li>
            {/* )} */}
            {/* {user && user.tipousuario === 'vendedor' && ( */}
            <li className="create-product">
              <Link to="/PublicarProducto" className="nav-link create-product">
                Crear producto
              </Link>
            </li>
            {/* )} */}
          </ul>

          {/* Sección de Precio */}
          <div className="filter-section">
            <h6 className="filter-title">Precio</h6>
            <div className="price-filter">
              <input 
                type="number" 
                className="form-controlprecio price-input" 
                placeholder="Mínimo" 
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
              />
              <span className="price-separator">-</span>
              <input 
                type="number" 
                className="form-controlprecio price-input" 
                placeholder="Máximo" 
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
              />
              <CircleChevronRight 
                className="price-arrow" 
                size={16} 
                onClick={handlePriceFilter}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Nueva sección de Categorías */}
          <div className="filter-section">
            <h6 className="filter-title">Categorías</h6>
            <div className="category-buttons">
              {["Frutas", "Legumbres", "Cereales", "Tuberculos", "Especias", "Nueces o semillas"].map((category) => (
                  <button
                      key={category}
                      className={`category-button ${selectedCategory === category ? "active" : ""}`}
                      onClick={() => handleCategoryClick(category)}
                  >
                      <span className="category-name">{category}</span>
                      <span className="category-count">
                          ({categoryCounts[category.toLowerCase()] || 0})
                      </span>
                  </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <nav className="main-nav navbar navbar-expand-md navbar-light bg-light border-bottom w-100v2">
        <div className="container-fluid">
          <button
            className="navbar-toggler d-md-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobile-menu"
            aria-controls="mobile-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to={`/logged/${user?.username}`} className="brand-link">
            <span className="brand-text">Mercalista</span>
          </Link>

          <div className="collapse navbar-collapse justify-content-center">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="search-btn btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>

          {/* Íconos visibles solo en desktop */}
          <Link to="/ShoppingCart" className="account-link ml-auto">
            <img className="nav-icon-menu" src={Carrito || "/placeholder.svg"} alt="Carrito" />
          </Link>
          <Link to="#" className="account-link ml-auto">
            <img className="nav-icon-menu " src={notificacion || "/placeholder.svg"} alt="Notificación" />
          </Link>
          <div className="dropdown">
            <button
              className="dropdownMenu btn btn-secondary"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img className="nav-icon-menu profile-icon " src={usuario || "/placeholder.svg"} alt="Usuario" />
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to={`/Profile/${user?.cedula}`} className="iconU dropdown-item">
                  <img className="icon" src={usuario || "/placeholder.svg"} alt="Usuario" />
                  <p>Mi Perfil</p>
                </Link>
              </li>
              <li>
                <a className="iconU dropdown-item" href="#">
                  <img className="icon" src={chat || "/placeholder.svg"} alt="Chat" />
                  Chats
                </a>
              </li>
              <li>
                <a className="iconS dropdown-item" href="#">
                  <img className="icon" src={premiumIcon || "/placeholder.svg"} alt="Premium" />
                  Premium
                </a>
              </li>
              <button className="iconCs" onClick={handleLogout}>
                <img className="icon" src={logOut || "/placeholder.svg"} alt="Cerrar Sesion" />
                Cerrar Sesion
              </button>
            </ul>
          </div>
        </div>
      </nav>

      <div className="collapse d-md-none" id="mobile-menu">
        <nav className="mobile-nav bg-light p-3">
          <ul className="mobile-nav-list nav flex-column">
            
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <img className="nav-icon" src={ventasIcon || "/placeholder.svg"} alt="Premium" />
                  Mis Productos
                </a>
                <div className="collapse" id="collapseExample">
                  <div className="card-productos card card-body">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <Link to="/OnSale" className="nav-link">
                          <img className="iconP" src={ventaP || "/placeholder.svg"} alt="Premium" />
                          En Venta
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Sales" className="nav-link">
                          <img className="iconP" src={vendidoP || "/placeholder.svg"} alt="Premium" />
                          Vendidos
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            
            <li className="nav-item2">
              <Link to="/Suscription" className="nav-link2 mobile-link" style={{ color: "rgb(255, 238, 0)" }}>
                <img className="nav-icon" src={premiumIcon || "/placeholder.svg"} alt="Premium" />
                <p className="linkP">Premium</p>
              </Link>
            </li>
            <li className="nav-item2">
              <Link to="/Purchases" className="nav-link2 mobile-link">
                <img className="nav-icon" src={comprasIcon || "/placeholder.svg"} alt="Compras" />
                <p className="link">Mis Compras</p>{" "}
              </Link>
            </li>
            <li className="create-product-item">
              <Link to="/PublicarProducto" className="nav-link create-product-link">
                Crear producto
              </Link>
            </li>
          </ul>

          

          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="search-btn btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </nav>
      </div>

      <input
        id="profile-image-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleProfileImageChange}
      />
      {children}
      <Footer />
    </div>
  )
}

export default Menu
