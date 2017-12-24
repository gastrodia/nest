import { FETCH_BIRDS_SUCCESS } from "./actions";

export function birds(state = [], action){
    switch(action.type){
        case FETCH_BIRDS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}