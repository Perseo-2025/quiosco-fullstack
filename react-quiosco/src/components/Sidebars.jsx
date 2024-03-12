import useQuiosco from '../hooks/useQuiosco'
import Categoria from '../components/Categoria'
import { useAuth } from '../hooks/useAuth'

export default function Sidebars() {

    const { categorias } = useQuiosco()
    const { logout, user } = useAuth({middleware: 'auth'})

  return (
    <aside className='md:w-72'>
        <div className='p-4'>
            <img src="img/logo.svg" alt="Imagen Logo" 
            className='w-40'
            />
        </div>
        <p className='my-10 text-xl text-center items-center '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        <span className='font-bold text-xl'>
            {user?.name}</span>
        </p>

    <div className="mt-10">
        {categorias.map( categoria => (
           <Categoria
                key={categoria.id}
                categoria={categoria} 
           />
        ))}
    </div>

    <div className='my-5 py-5'>
        <button
            type='button'
            className='text-center bg-red-500 rounded-sm w-full p-3 font-bold
            text-white truncate'
            onClick={logout}
        >
            Cancelar Orden
        </button>
    </div>

    </aside>
  )
}
