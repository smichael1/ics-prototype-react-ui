/**
 * Created by smichaels on 6/23/17.
 */

import {FETCH_ASSEMBLY_CONFIG} from '../actions/index';
import {ActionTypes} from '../websockets';


export default function(state = [], action) {

    switch (action.type) {

        case FETCH_ASSEMBLY_CONFIG:
            return action.payload.data;

    }

    return state;
}