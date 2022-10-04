import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'

const auth = '/api/auth'
const editor = '/api/editor'

export { axios, auth, editor }