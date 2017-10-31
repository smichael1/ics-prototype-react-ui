import axios from 'axios';
import {ActionTypes} from '../websockets';

const ROOT_URL = `http://localhost:9000`;

export const FETCH_COMMANDS = 'FETCH_COMMANDS';
export const FETCH_ASSEMBLY_CONFIG = 'FETCH_ASSEMBLY_CONFIG';
export const FETCH_HCD_CONFIG = 'FETCH_HCD_CONFIG';

export function fetchCommands() {

    const request = axios.get(`${ROOT_URL}/commands`);

    return {
        type: FETCH_COMMANDS,
        payload: request
    };
}

export function fetchConfig(configFile) {

    console.log(`${ROOT_URL}/configs/${configFile}`);

    const request = axios.get(`${ROOT_URL}/configs/${configFile}`);

    if (configFile == "singleAxis")
        return {
            type: FETCH_ASSEMBLY_CONFIG,
            payload: request
        };

    if (configFile == "galilHCD")
        return {
            type: FETCH_HCD_CONFIG,
            payload: request
        };


}


export function sendWebsocketMessage() {

    console.log('sendWebsocketMessage called');

    return {
        type: ActionTypes.WEBSOCKET_SEND,
        payload: "Scott Websocket rocks",
        meta: { websocket: true }
    }
}
