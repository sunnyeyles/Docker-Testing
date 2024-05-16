// test authentication
import axios from 'axios'
const port = 8000
const baseUrl = `http://fastapi:${port}/`
// const port = 8000
// const baseUrl = `http://0.0.0.0:${port}/`

export const checkAuthentication = async (
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

    if (response.data.permissions.length && response.status === 200) {
      console.log('user authenticated')
      return true
    } else if (
      !response.data.permissions.length < 2 &&
      response.status === 200
    ) {
      console.log('user not authenticated')
      return false
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
const mountToVolume = async () => {
  try {
    const data = await checkAuthentication(
      baseUrl,
      'permissions',
      'alice',
      'wonderland'
    )
    await fs.writeFile('output.txt', data.toString())
    console.log('data written to file')
  } catch (error) {
    console.error('dailed to write data to file:', error)
  }
}
mountToVolume()
