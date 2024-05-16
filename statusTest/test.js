import * as fs from 'fs'
import axios from 'axios'
const port = 8000
const baseUrl = `http://fastapi:${port}/`

const getStatus = async (baseUrl, endpoint) => {
  try {
    const response = await axios.get(`${baseUrl}${endpoint}`)
    console.log('response status:', response.status)
    if (response.status === 200) {
      console.log('ds server is running')
      return response.status
    } else {
      console.error('unexpected status code:', response.status)
      throw new Error('unexpected status code')
    }
  } catch (error) {
    console.error('an error occurred:', error.message)
    throw error
  }
}

const mountToVolume = async () => {
  try {
    const data = await getStatus(baseUrl, 'status')
    fs.writeFile(
      '/app/statusTest/output/output.txt',
      data.toString(),
      (error) => {
        if (error) throw error
        console.log('data written to file')
      }
    )
  } catch (error) {
    console.error('failed to write data to file:', error)
  }
}
mountToVolume()
