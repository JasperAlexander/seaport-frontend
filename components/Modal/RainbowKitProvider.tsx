import { createContext, useContext } from 'react'
const ThemeIdContext = createContext<string | undefined>(undefined)

const attr = 'data-rk'

const createThemeRootProps = (id: string | undefined) => ({ [attr]: id || '' })

export const useThemeRootProps = () => {
  const id = useContext(ThemeIdContext)
  return createThemeRootProps(id)
}
