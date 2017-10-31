/**
 * Created by smichaels on 6/23/17.
 */

import {FETCH_HCD_CONFIG} from '../actions/index';
import {ActionTypes} from '../websockets';


export default function(state = [], action) {

    switch (action.type) {

        case FETCH_HCD_CONFIG:
            return action.payload.data;


    }

    return state;
}