import { STORE_CHARACTERS, SELECT_CHARACTER } from "./actionTypes";

export const storeCharacters = characters => {
    return {
        type: STORE_CHARACTERS,
        payload: characters
    }
}
export const selectCharacter = character => {
    return {
        type: SELECT_CHARACTER,
        payload: character
    }
}