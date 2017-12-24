import store from "../../store";
import { getURLObj } from "../../util";

export const FETCH_BIRDS_SUCCESS = 'FETCH_BIRDS_SUCCESS'

export function fetchBirds(){
    var url = getURLObj();
    var socket = new WebSocket(url.query.server + '/birds');
    socket.onopen = ()=>{
        socket.addEventListener("message",(e)=>{
            var data = JSON.parse(e.data || {})
            store.dispatch({
                type:FETCH_BIRDS_SUCCESS,
                payload:data
            })
        })	
    }
}