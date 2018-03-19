import axios from 'axios';
import {ActionTypes} from '../websockets';

const ROOT_URL = `http://localhost:9000`;

export const FETCH_COMMANDS = 'FETCH_COMMANDS';
export const FETCH_ASSEMBLY_CONFIG = 'FETCH_ASSEMBLY_CONFIG';
export const FETCH_HCD_CONFIG = 'FETCH_HCD_CONFIG';
export const FETCH_HCD_CONFIG_A = 'FETCH_HCD_CONFIG_A';

export function fetchCommands() {

    const request = axios.get(`${ROOT_URL}/commands`);

    return {
        type: FETCH_COMMANDS,
        payload: request
    };
}

export function fetchConfig(configFile, axis) {

    console.log(`${ROOT_URL}/configs/${configFile}`);

    const request = axios.get(`${ROOT_URL}/v1/gs/getConfig?axis=${axis}`);

    console.log("fetchConfig::request")
    console.log(request)

    if (configFile == "singleAxis")
        return {
            type: FETCH_ASSEMBLY_CONFIG,
            payload: request
        };

    if (configFile == "galilHCD") {

        return {
            type: FETCH_HCD_CONFIG + '_' + axis,
            payload: request
        };


    }

}


export function sendWebsocketMessage() {

    console.log('sendWebsocketMessage called');

    return {
        type: ActionTypes.WEBSOCKET_SEND,
        payload: "Scott Websocket rocks",
        meta: { websocket: true }
    }
}
