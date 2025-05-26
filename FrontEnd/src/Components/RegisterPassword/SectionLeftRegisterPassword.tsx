import logo from '../../assets/Image/logo.png';
import ImgVerduras from '../../assets/Image/ImgVerduras.jpeg';

export function SectionLeftRegisterPassword() {
    return (
        <>
            
            <div className='header-mercalista-register'>
                <a href="/">
                    <img src={logo} alt="Mercalista" className="Logo-Mercalista" />
                </a>
                
            </div>
            <h1 className="Title-CrearCuenta-Mercalista">
                <b>Crea tu usuario para terminar de <br />crear tu cuenta</b>
            </h1>
            <div className="Div-ImgVerduras">
                <img src={ImgVerduras} alt="Verduras" className="ImgVerduras" />
            </div>
        </>
    );
}
