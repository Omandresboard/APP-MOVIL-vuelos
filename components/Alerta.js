import { Text } from 'native-base'
import React from 'react'

export default function Alerta({alerta}) {
  return (
    <Text bg={alerta.error ? 'red.400' : 'success.400'} p={2} textAlign={'center'} color={'#fff'}>{alerta.msg}</Text>
  )
}
