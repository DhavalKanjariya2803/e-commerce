export default (context) => {
  context.$axios.interceptors.request.use((request) => {
    if (process.client) {
      context.$axios.defaults.baseURL = window.location.origin
    }
    if (context.req) {
      const host = context.req.headers.host
      context.$axios.defaults.baseURL = `https://${host}`
      if (host.includes('localhost')) {
        context.$axios.defaults.baseURL = `http://${host}`
      }
    } else if (window) {
      context.$axios.defaults.baseURL = window.location.origin
    }
    return request
  })
}
