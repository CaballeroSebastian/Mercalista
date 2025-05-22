import {useState} from 'react'

interface Producto{
    id: number,
    nombre: string,
    categoria?: string,
    stock?: number,
    UnidadMedida?: string,
    Descripcion?: string,
    precio: string,
    estado?: string
    foto: string 
}

interface Props{
    cerrar: ()=> void,
    informacion: Producto
}

const Edit =({cerrar, informacion}: Props)=>{

    const [productUpdate, setProductUpdate] = useState({
        nombre: "",
        categoria: "",
        stock: 0,
        UnidadMedida: "",
        Descripcion: "",
        estado: "",
        precio: 0,
        foto: ""
    })

    const prductoArray = [informacion]
    return(
        <>
            <form action="">
                <center><input type="text"
                name="nombre"
                value={informacion.nombre}
                onChange={(e)=> setProductUpdate({...productUpdate, nombre: e.target.value})}/></center>
            </form>
        </>
    )
}

export default Edit

{/* <ul>
    {Object.entries(informacion).map(([clave, valor]) => (
        <div key={clave}>
            <center><li><strong>{clave}</strong>: {valor}</li></center>
        </div>
    ))}
</ul>  */}