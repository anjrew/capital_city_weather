import axios from "../axios";

export const parseCitysResp = store => next => action => {
    if (action.type === "GET_CITYS_FULFILLED") {
 
        const query = store.getState().query;
        action.payload = action.payload
            .map((item) => item.capital);
    }
    
    next(action);
};

export const getCurrentLocation = store => next => action => {
    if (action.type === "GET_CURRENT_LOCATION") {

        navigator.geolocation.getCurrentPosition(success, error, {timeout:10000});

        function success(position){
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY');
            action.type = 'GET_CURRENT_LOCATION_FULFILLED';
            action.payload = position;
        }

        function error(){
            action.type = 'GET_CURRENT_LOCATION_REJECTED';
            next(action);
        }
		
        next({
            type:'GET_CURRENT_LOCATION_PENDING',
        });
    }
};