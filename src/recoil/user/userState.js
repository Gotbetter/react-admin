import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// const sessionStorage = 
//       typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage: sessionStorage
});

const initialState = {
    user_id: null, 
    auth_id: null, 
    username: null, 
    email: null, 
    profile: null
};

export const userState = atom({
    key: "user",
    default: initialState,
    effects_UNSTABLE: [persistAtom]
})