import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ producto, setProducto ] = useState({});
    const [ pedido, setPedido ] = useState([]);
    const [ total, setTotal ] = useState([0]);

    useEffect(()=> {
        const nuevoTotal = pedido.reduce( ( total, producto) => (
            producto.precio * producto.cantidad) + total, 0 )
            setTotal(nuevoTotal)
    }, [pedido])/*  */

    /* categorias */
    const ontenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try{
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data);
            setCategoriaActual(data.data[0])
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        ontenerCategorias();
    }, [])


    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0];
        setCategoriaActual(categoria);

    }/*  */

    const handleClickModal = () => {
        setModal(!modal)
    }/*  */

    const handleSetProducto = producto => {
        setProducto(producto)
    }/*  */

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        if(pedido.some( pedidoState => pedidoState.id === producto.id )){
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto :pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregando al Pedido')
        }
    }/*  */

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }/*  */

    const handleEliminarProductoPedido = id =>{
        const pedidoActualizado = pedido.filter(producto => producto.id !== id )
        setPedido(pedidoActualizado)
        toast.success('Pedido Eliminado')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try{
            const {data} = await clienteAxios.post('/api/pedidos', 
            {
                total, 
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message);
            setTimeout(() => {
                setPedido([])
            }, 1000);


            /* Cerrar la sesion del usuario (en caso de que se haya confirmado el pedido el sistema se cerrarra automaticamente)*/
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);
            /*  */
        }catch(error){
            console.log(error)
        }
    }

    const handleCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try{
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }) /* Actualizar la orden */
        }catch(error){
            console.log(error)
        }
        
    }


    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try{
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }) /* Actualizar la orden */
        }catch(error){
            console.log(error)
        }
        
    }


    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleCompletarPedido,
                handleClickProductoAgotado
            }}

        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext