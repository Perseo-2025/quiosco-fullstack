import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const {registro} = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        registro(datos, setErrores)
    }

  return (
    <>
        <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
        <p>Crea tu Cuenta llenando el formulario</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form 
                onSubmit={handleSubmit}
                noValidate
            >
                {errores ? errores.map((error,i) => <Alerta key={i}>{error}</Alerta>)  : null}
                    
                <div className="mb-4">
                    <label 
                    htmlFor="name"
                    className="text-slate-800 font-bold"
                    >
                        Nombre: 
                    </label>
                    <input 
                        type="text" 
                        id="name"
                        className="mt-2 w-full block p-3 bg-gray-50"
                        name="name"
                        placeholder="Tu nombre"
                        ref={nameRef}
                    />
                </div>

                <div className="mb-4">
                    <label 
                    htmlFor="email"
                    className="text-slate-800 font-bold"
                    >
                        Email: 
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        className="mt-2 w-full block p-3 bg-gray-50"
                        name="email"
                        placeholder="Tu email"
                        ref={emailRef}
                    />
                </div>

                <div className="mb-4">
                    <label 
                    htmlFor="password"
                    className="text-slate-800 font-bold"
                    >
                        Password: 
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        className="mt-2 w-full block p-3 bg-gray-50"
                        name="password"
                        placeholder="Tu password"
                        ref={passwordRef}
                    />
                </div>

                <div className="mb-4">
                    <label 
                    htmlFor="password_confirmation"
                    className="text-slate-800 font-bold"
                    >
                        Repetir Password: 
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        className="mt-2 w-full block p-3 bg-gray-50"
                        name="password"
                        placeholder="Confirmar password"
                        ref={passwordConfirmationRef}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Crear Cuenta"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3
                    uppercase font-bold cursor-pointer rounded-sm"
                />

            </form>
        </div>

        <nav className="mt-5">
            <Link to="/auth/login">
                ¿Ya tienes cuenta? <span className="text-indigo-600 hover:text-indigo-800">Inciar Sesión</span> 
            </Link>
        </nav>
    </>
    
  )
}
