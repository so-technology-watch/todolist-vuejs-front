import https from "https"

const hostname = 'api-adresse.data.gouv.fr'

export function GetAll() {
  const options = {
    hostname: hostname,
    path: '/search/?q=43%20route%20de%20la%20joneliere',
    method: 'GET',
  }

  return requestMaker(options, x => console.log(JSON.parse(x)))
}

function requestMaker(options, dataHandler) {
  https.request(options, res => {
    return res.on('data', dataHandler)
  })
  .on('error', console.error)
  .end()
}