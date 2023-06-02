const PREFIX = '/api'

const ROUTES = {
  main: {
    users: `${PREFIX}/users`,
    ingresos: `${PREFIX}/ingresos`,
    gastos: `${PREFIX}/gastos`,
    frecuentes: `${PREFIX}/frecuentes`,
    ia: `${PREFIX}/ia`,
  },
}

export const userRoutes = {
  index: '/',
  getUser: '/getUser',
  updateUser: '/updateUser',
  updatePhoto: '/updatePhoto',
  logout: '/logout',
  deleteAccount: '/deleteAccount',
  cleanAccount: '/cleanAccount',
  setProfile: '/setProfile',
}

export const ingresosRoutes = {
  getIngresos: '/getIngresos',
  updateIngreso: '/updateIngreso',
}

export const gastosRoutes = {
  createGastoDiario: '/createGastoDiario',
  getGastos: '/getGastos',
  getSemanas: '/getSemanas/:semana?',
  getDay: '/getDay/:day?',
  updateGasto: '/updateGasto',
}

export const frecuentesRoutes = {
  index: '/',
  id: '/:id',
  getCobrosFreq: '/getCobrosFreq/:id',
  setCobrosFreqMonto: '/setCobrosFreqMonto/:id',
}

export const iaRoutes = {
  getAllFreq: '/getAllFreq',
  getAllDiarios: '/getAllDiarios',
  getClassifications: '/getClassifications',
  getPredictions: '/getPredictions',
  test: '/test',
}

export default ROUTES
