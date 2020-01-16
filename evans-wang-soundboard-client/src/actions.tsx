export const SET_SOUND = 'SET_SOUND';


interface SetSoundAction {

}


export function setSound(sound: any) {
    return {
        type: SET_SOUND,
        currentSound: sound
    }
}