import { User } from '../entities/User';
export interface AuthRepository {
    login(email: string, password: string): Promise<User>;
    signup(name: string, email: string, password: string): Promise<User>;
    logout(): Promise<void>;
    currentUser(): Promise<User | null>;
}