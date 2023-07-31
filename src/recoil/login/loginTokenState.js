import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// const sessionStorage = 
//       typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage: sessionStorage
});

const initialState = {
    accessToken: null,
    refreshToken: null
};

export const loginTokenState = atom({
    key: "loginToken",
    default: initialState,
    effects_UNSTABLE: [persistAtom]
})