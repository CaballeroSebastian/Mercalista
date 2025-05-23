import logo from '../../assets/Image/logo.png';
import ImgVerduras from '../../assets/Image/ImgVerduras.jpeg';

export function SectionLeftRegister() {
    return (
        <>
            
            <div className='header-mercalista-register'>
                <a href="/">
                    <img src={logo} alt="Mercalista" className="Logo-Mercalista" />
                </a>
                
            </div>
            <h1 className="Title-CrearCuenta-Mercalista">
                <b>Completa los datos para <br />crear tu cuenta</b>
            </h1>
            <div className="Div-ImgVerduras">
                <img src={ImgVerduras} alt="Verduras" className="ImgVerduras" />
            </div>
        </>
    );
}
