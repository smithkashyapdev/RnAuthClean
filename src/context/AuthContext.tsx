import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { LoginUseCase } from '../domain/usecases/LoginUseCase';
import { SignupUseCase } from '../domain/usecases/SignupUseCase';
import { LogoutUseCase } from '../domain/usecases/LogoutUseCase';
import { AuthRepositoryImpl } from '../data/repositories/AuthRepositoryImpl';
import { User } from '../domain/entities/User';
const repo = new AuthRepositoryImpl();
const loginUC = new LoginUseCase(repo);
const signupUC = new SignupUseCase(repo);
const logoutUC = new LogoutUseCase(repo);
interface AuthState { user: User | null; initializing: boolean; error: string | null; }
const initial: AuthState = { user: null, initializing: true, error: null };
function reducer(s: AuthState, a: any): AuthState {
    switch (a.type) {
        case 'SET_USER': return { ...s, user: a.payload, error: null };
        case 'SET_ERROR': return { ...s, error: a.payload };
        case 'SET_INITIALIZING': return { ...s, initializing: a.payload };
        default: return s;
    }
}
interface Ctx { user: User | null; initializing: boolean; error: string | null; login: (e: string, p: string) => Promise<void>; signup: (n: string, e: string, p: string) => Promise<void>; logout: () => Promise<void>; }
const AuthContext = createContext<Ctx | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial);
    useEffect(() => { (async () => { try { const u = await repo.currentUser(); dispatch({ type: 'SET_USER', payload: u }); } finally { dispatch({ type: 'SET_INITIALIZING', payload: false }); } })(); }, []);
    const value = useMemo(() => ({
        user: state.user,
        initializing: state.initializing,
        error: state.error,
        login: async (email: string, password: string) => { try { const u = await loginUC.execute(email, password); dispatch({ type: 'SET_USER', payload: u }); } catch (e: any) { dispatch({ type: 'SET_ERROR', payload: e.message }); throw e; } },
        signup: async (name: string, email: string, password: string) => { try { const u = await signupUC.execute(name, email, password); dispatch({ type: 'SET_USER', payload: u }); } catch (e: any) { dispatch({ type: 'SET_ERROR', payload: e.message }); throw e; } },
        logout: async () => { await logoutUC.execute(); dispatch({ type: 'SET_USER', payload: null }); }
    }), [state.user, state.initializing, state.error]);
    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};
export const useAuth = () => { const c = useContext(AuthContext); if (!c) throw new Error('useAuth must be used within AuthProvider'); return c; };