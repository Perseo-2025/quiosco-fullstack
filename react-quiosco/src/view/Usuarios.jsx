import useSWR from "swr"
import clienteAxios from "../config/axios"


export default function Usuarios() {

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clienteAxios('api/usuarios')

  return (
    <div>Usuarios</div>
  )
}
