import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDTO } from '../models/UserDTO';
const USERS_KEY = 'users';
const SESSION_KEY = 'sessionUser';

export const LocalAuthSource = {
    async getUsers(): Promise<UserDTO[]> { const raw = await AsyncStorage.getItem(USERS_KEY); return raw ? JSON.parse(raw) : []; },
    async saveUsers(users: UserDTO[]) { await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users)); },
    async setSession(user: UserDTO | null) { user ? await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user)) : await AsyncStorage.removeItem(SESSION_KEY); },
    async getSession(): Promise<UserDTO | null> { const raw = await AsyncStorage.getItem(SESSION_KEY); return raw ? JSON.parse(raw) : null; }
};