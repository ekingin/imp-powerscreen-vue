import hyRequest from './request'

export function getPowerScreenData() {
  return hyRequest.get({
    url: "/powerscreen"
  })
}
