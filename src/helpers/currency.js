export const formatCurrency = amount => Number(amount).toLocaleString('es-CL', {
  style: 'currency',
  currency: 'CLP'
})
