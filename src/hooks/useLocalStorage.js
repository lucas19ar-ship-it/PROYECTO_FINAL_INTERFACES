import { useState, useEffect } from 'react'

function useLocalStorage(key, initiaValue) {
    const [value, setValue] = useState(() => {
      try {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : initiaValue
      } catch (error) { 
        console.error(`Error leyendo localStorage para la clave "${key}":`, error)
        return initiaValue
      }
      
    })

    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`Error guardando en localStorage para la clave "${key}":`, error)
      }
    }, [key, value])

    return [value, setValue]

}

export default useLocalStorage