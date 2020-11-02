const ADD_REGIONS = 'SearchRegion/myRegionsReducer/ADD-REGIONS';
const REMOVE_REGION = 'SearchRegion/myRegionsReducer/REMOVE-REGION';

const initialState = {
    myRegions: []
}

export const myRegionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REGIONS: return {
            ...state,
            myRegions: [...state.myRegions, ...action.myRegions]
        }
        case REMOVE_REGION: return {
            ...state,
            myRegions: state.myRegions.filter(e => e.id !== action.id)
        }
        default:
            return state;
    }
}

export const addMyRegionsCreator = myRegions => ({
    type: ADD_REGIONS,
    myRegions
})

export const removeRegionCreator = id => ({
    type: REMOVE_REGION,
    id
});