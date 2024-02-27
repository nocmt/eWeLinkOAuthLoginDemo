import { wsClient, client } from './config.js';
import * as fs from "fs";

let region = "us";
let at = "";

const getUserApiKey = async ()=> {
    if (fs.existsSync("token.json")) {
        const tokenObj = JSON.parse(fs.readFileSync("token.json"));
        at = client.at = tokenObj.data.accessToken;
        region = client.region = tokenObj.region;
        client.setUrl(region);
        const response = await client.home.getFamily({});
        return response.error === 0 ? response.data.familyList[0]?.apikey : null;
    }else{
        console.error("token.json not found");
        process.exit(1);
    }
}

// GET@/v2/family
wsClient.userApiKey = await getUserApiKey();

if (wsClient.userApiKey && region) {
    await wsClient.Connect.create({
        appId: wsClient?.appId || "",
        at: at,
        region: region,
        userApiKey: wsClient.userApiKey
    }, ()=>{
        console.log("connected");
    }, ()=>{
        console.log("disconnected");
    }, (_err)=>{
        console.log("Error generated:", _err);
    }, (_ws, _msg)=>{
        console.log("Received message: ", _msg);
    });
}