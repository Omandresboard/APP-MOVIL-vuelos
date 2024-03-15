import React, { useContext } from 'react'
import VueloContext from '../context/VueloProvider'

export default function useVuelo() {
  return useContext(VueloContext)
}
