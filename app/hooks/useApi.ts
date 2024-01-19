import ApiService from '../services/ApiService'

export function useApi(): ApiService {
  const api = new ApiService()
  return api
}
