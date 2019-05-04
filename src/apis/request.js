import axios from 'axios'
import store from '@/store/store'

var instance = axios.create({
    baseURL: 'https://easy-mock.com/mock/5cb74152e611566d317c3b26/management', // url = base url + request url
    // baseURL: 'https://api.echo.ituoniao.net/api/web', // url = base url + request url
    // baseURL: 'http://120.78.122.146:18090', // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

instance.interceptors.request.use(function (config) {
        if (store.state.token) { //判断token是否存在
            config.headers.token = store.state.token;  //将token设置成请求头
        }
        return config
    },

    function (error) {
        console.error('error occured ')
        return Promise.reject(error)
    }
)

instance.interceptors.response.use((response) => {
        return response.data
    },
    (error) => {
        console.log('response status failed')
        return Promise.reject(error)
    }
)

export default function (url, method, data = null) {
    method = method.toLowerCase()
    if (method === 'get') {
        return instance.get(url, data)
    } else if (method === 'post') {
        return instance.post(url, {
            params: data
        })
    } else if (method === 'put') {
        return instance.put(url, {
            params: data
        })
    } else if (method === 'delete') {
        return instance.delete(url, {
            params: data
        })
    } else {
        console.error('unknown HTTP method')
        return false
    }
}
