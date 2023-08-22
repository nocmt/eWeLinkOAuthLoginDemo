import { client } from './config.js'
import * as fs from 'fs'

const controlDeviceDemo = async () => {
  // If the file does not exist, directly report an error
  if (!fs.existsSync('./token.json')) {
    throw new Error('token.json not found, please run login.js first')
  }

  // get token
  const LoggedInfo = JSON.parse(fs.readFileSync('./token.json', 'utf-8'))
  // console.info(LoggedInfo)

  // client.syncLocalToken(region, account= "");
  client.at = LoggedInfo.data?.accessToken
  client.region = LoggedInfo?.region || 'eu'
  client.setUrl(LoggedInfo?.region || 'eu')

  // Get device list
  try {
    let thingList = await client.device.getAllThings({}) // { status: 200, error: 0, msg: "", data: { thingList: [{ itemType: 1, itemData: {...} }], total: 1 } };
    if (thingList?.error === 0) {
      thingList = thingList.data.thingList
      console.log(thingList)
      // Control the first single channel device, just an example
      if (thingList[0]?.itemData.extra.uiid === 1) {
        await client.device.setThingStatus({
          type: 1,
          id: thingList[0].itemData.deviceid,
          params: {
            switch: 'on', // Specific control instructions: https://coolkit-technologies.github.io/eWeLink-API/#/en/UIIDProtocol
          },
        })
      }
      // Control the first dual channel device, just an example
      if (thingList[0]?.itemData.extra.uiid === 4) {
        await client.device.setThingStatus({
          type: 1,
          id: thingList[0].itemData.deviceid,
          params: {
            switches: [
              { switch: 'off', outlet: 0 },
              { switch: 'off', outlet: 1 },
              { switch: 'off', outlet: 2 },
              { switch: 'off', outlet: 3 },
            ],
          },
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}

controlDeviceDemo()
