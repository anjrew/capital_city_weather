import axios from "../axios";

export const parseCitysResp = store => next => action => {
    if (action.type === "GET_CITYS_FULFILLED") {
    //     console.log(action.payload.data.results);

    //     action.payload = action.payload.data.results.map((item) =>{
    //         let subtitle = item.highlightedVicinity ?
    //             item.highlightedVicinity
    //                 .replace(new RegExp('<b>', 'g'),'')
    //                 .replace(new RegExp('</b>', 'g'),'')
    //                 .replace(new RegExp('<br/>', 'g'),', '): '';
            
    //         return ({ 
    //             title: item.title,
    //             subTitle: subtitle,
    //             lat: item.position[0],
    //             long: item.position[1]
    //         }); });
		// }
		console.log('The action at this stage is', action);
        console.log(store.getState());
        const query = store.getState().query;
        action.payload = action.payload
            .map((item) => item.capital);
            // .filter((item) => item.startsWith(query));
        console.log('The action at this stage is', action);
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