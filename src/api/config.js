import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 (필요시 토큰 추가 등)
api.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('API 요청 에러:', error)
    return Promise.reject(error)
  },
)

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API 응답 에러:', error.response?.status, error.message)

    // 공통 에러 처리
    if (error.response?.status === 401) {
      // 인증 실패 처리
      console.log('인증이 필요합니다.')
    } else if (error.response?.status === 500) {
      // 서버 에러 처리
      console.log('서버 에러가 발생했습니다.')
    }

    return Promise.reject(error)
  },
)

export default api
