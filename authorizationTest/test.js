import axios from 'axios'
const port = 8000
const baseUrl = `http://fastapi:${port}/`
// const port = 8000
// const baseUrl = `http://0.0.0.0:${port}/`

export const checkAuthorization = async (
  baseUrl,
  endpoint,
  username,
  password
) => {
  try {
    const params = {
      username: username,
      password: password,
    }
    const response = await axios.get(`${baseUrl}${endpoint}`, { params })
    if (response.data.permissions.length > 1 && response.status === 200) {
      console.log('user authorized')
      return true
    } else if (
      !response.data.permissions.length > 1 &&
      response.status === 200
    ) {
      console.log('user not authorized')
      return false
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
checkAuthorization(baseUrl, 'permissions', 'alice', 'wonderland')

const mountToVolume = async () => {
  try {
    const data = await checkAuthorization(
      baseUrl,
      baseUrl,
      'permissions',
      'alice',
      'wonderland'
    )
    await fs.writeFile('output.txt', data.toString())
    console.log('data written to file')
  } catch (error) {
    console.error('failed to write data to file:', error)
  }
}
mountToVolume()
