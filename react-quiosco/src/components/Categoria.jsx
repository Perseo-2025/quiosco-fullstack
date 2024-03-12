import useQuiosco from "../hooks/useQuiosco"

export default function Categoria({categoria}) {

    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const {icono, id, nombre} = categoria

    return (
        <div className={`${categoriaActual.id === id ? "bg-amber-400" : 'bg-white'}`}>
            <button 
                className="text-lg font-bold cursor-pointer truncate
                flex items-center gap-4 border w-full p-3 
                hover:bg-amber-400 
                "
                type="button"
                onClick={ () => handleClickCategoria(id) }
            >

                <img 
                src={`/img/icono_${icono}.svg`} 
                alt="Imagen Icono" 
                className="w-12"
                />
                {nombre}
            </button>

        </div>
    )
}
