import React from 'react';
import { Link } from 'react-router-dom';
import Api from '../services/api';
import Swal from 'sweetalert2';

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            nombre_producto:"",
            referencia:"",
            precio:"",
            peso:"",
            categoria:"",
            stock:"",
            fecha_creacion:"",
            errores:[]
        }
    }

    cambioValor = (e) =>{
        const state= this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state, errores:[] });
    }
    
    verificarError(elemento){
        return this.state.errores.indexOf(elemento) !== -1;
    }
    
    enviarDatos = (e) =>{
        e.preventDefault();

        const { 
            nombre_producto, 
            referencia, 
            precio, 
            peso, 
            categoria, 
            stock, 
            fecha_creacion 
        } = this.state;

        let datosEnviar = { 
            nombre_producto:nombre_producto,  
            referencia:referencia, 
            precio:precio, 
            peso:peso, 
            categoria:categoria, 
            stock:stock, 
            fecha_creacion:fecha_creacion
        }


        let errores = [];

        if(!nombre_producto)errores.push("error_nombre");
        if(!referencia)errores.push("error_referencia");
        if(!precio)errores.push("error_precio");
        if(!peso)errores.push("error_peso");
        if(!categoria)errores.push("error_categoria");
        if(!stock)errores.push("error_stock");
        if(!fecha_creacion)errores.push("error_creacion");

        this.setState({errores:errores});
        if(errores.length > 0) return false;
        
        
        fetch(Api+"?insertar", {
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(respuesta => respuesta.json())
        .then((datos) => {
            if(datos.success == 1){
                Swal.fire({
                    title: 'Compleado!',
                    text: 'Producto creado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'aceptar'
                  }).then(()=> {
                    this.props.history.push("/");
                  })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'error al crear el producto',
                    icon: 'error',
                    confirmButtonText: 'aceptar'
                  })
            }
        })
        .catch(console.log)


    }
    
    render(){

        const{
              nombre_producto, 
              referencia, 
              precio, 
              peso, 
              categoria, 
              stock, 
              fecha_creacion
        } = this.state;
        
        return( 
            <div className="card">
                <div className="card-header">
                    Producto
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>

                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="">Nombre Producto</label>
                                <input type="text" 
                                       name="nombre_producto" 
                                       onChange={this.cambioValor} 
                                       value={nombre_producto} 
                                       id="nombre_producto" 
                                       className={ ((this.verificarError("error_nombre"))?"is-invalid":"" )+" form-control"} />
                                <small id="helpId" className="invalid-feedback">Escribe el nombre del producto</small>
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="">Referencia</label>
                                <input type="text"
                                       name="referencia"
                                       onChange={this.cambioValor}
                                       value={referencia}
                                       id="referencia"
                                       className={ ((this.verificarError("error_referencia"))?"is-invalid":"" )+" form-control"} />
                                <small id="helpId" className="invalid-feedback">Escribe la referencia del producto</small>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="">Precio</label>
                                <input type="number"
                                       name="precio"
                                       onChange={this.cambioValor}
                                       value={precio}
                                       id="precio"
                                       min={1}
                                       className={ ((this.verificarError("error_precio"))?"is-invalid":"" )+" form-control"} />
                                <small id="helpId" className="invalid-feedback">Escribe el precio del producto</small>
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="">Peso</label>
                                <input type="number"
                                       name="peso"
                                       onChange={this.cambioValor} 
                                       value={peso}
                                       id="peso"
                                       min={1}
                                       className={ ((this.verificarError("error_peso"))?"is-invalid":"" )+" form-control"} />
                                <small id="helpId" className="invalid-feedback">Escribe el peso del producto</small>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="">Categor??a</label>
                                <input type="text" 
                                       name="categoria" 
                                       onChange={this.cambioValor} 
                                       value={categoria} 
                                       id="categoria" 
                                       className={ ((this.verificarError("error_categoria"))?"is-invalid":"" )+" form-control"} />
                                <small id="helpId" className="invalid-feedback">Escribe la categoria del producto</small>
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="">Stock</label>
                                <input type="number"
                                       name="stock" 
                                       onChange={this.cambioValor} 
                                       value={stock} 
                                       id="stock"
                                       min={1}
                                       className={ ((this.verificarError("error_stock"))?"is-invalid":"" )+" form-control"} />
                                <small id="helpId" className="invalid-feedback">Escribe el stock del producto</small>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12">
                                <label htmlFor="">Fecha Creaci??n</label>
                                <input type="date" 
                                       name="fecha_creacion" 
                                       onChange={this.cambioValor} 
                                       value={fecha_creacion} 
                                       id="fecha_creacion" 
                                       required
                                       className=" form-control" />
                            </div>
                        </div>

                        <div className="btn-group mt-3" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Crear</button>
                            <Link className="btn btn-primary" to={"/"}>Cancelar</Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default Crear;