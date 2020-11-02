const GET_REGIONS = 'SearchRegion/searchReducer/GET-REGIONS';
const SET_CHECKBOX = 'SearchRegion/searchReducer/SET-CHECKBOX';

const initialState = {
    regions: [
        { id: 1, checked: false, state: "New York", country: "Kings County" },
        { id: 2, checked: false, state: "Washington", country: "Adams County" },
        { id: 3, checked: false, state: "Saint-Petersburg", country: "Russia" },
        { id: 4, checked: false, state: "Los-Angeles", country: "USA" },
        { id: 5, checked: false, state: "Kiev", country: "Ukraine" },
        { id: 6, checked: false, state: "Odessa", country: "Ukraine" },
        { id: 7, checked: false, state: "Minsk", country: "Belarus" },
    ],
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHECKBOX: return {
            ...state,
            regions: state.regions.map(region => {
                if (region.id === action.id) {
                    region.checked = !region.checked;
                }
                return region;
            })
        }
        case GET_REGIONS: return {
            ...state,
            regions: state.regions.map(e => {
                e.checked = false;
                return e;
            }) // simulates a data request
        }
        default:
            return state;
    }
}

export const setCheckboxCreator = id => ({
    type: SET_CHECKBOX,
    id
})

export const getRegionsCreator = () => ({ // in real project must be a thunk with async requests
    type: GET_REGIONS
})