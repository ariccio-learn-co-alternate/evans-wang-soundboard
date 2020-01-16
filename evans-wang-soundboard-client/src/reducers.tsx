import {AppState, defaultState} from './App'
import {SET_SOUND} from './actions';

export function topLevelReducer(state: AppState = defaultState, action: any) {
    switch (action.type) {
        case SET_SOUND:
            debugger;
            return {
                currentSound: action.currentSound,
                ...state
            };

        default:
            return state;


    }
}