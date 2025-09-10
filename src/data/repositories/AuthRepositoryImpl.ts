import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/entities/User';
import { LocalAuthSource } from '../sources/LocalAuthSource';
import { UserDTO } from '../models/UserDTO';
import { hashPassword, makeId, toUser } from '../../infrastructure/storage/storage';
export class AuthRepositoryImpl implements AuthRepository {
    async login(email: string, password: string): Promise<User> {
        const users = await LocalAuthSource.getUsers();
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!found || found.passwordHash !== hashPassword(password)) throw new Error('Incorrect credentials');
        await LocalAuthSource.setSession(found); return toUser(found);
    }
    async signup(name: string, email: string, password: string): Promise<User> {
        const users = await LocalAuthSource.getUsers();
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error('Email already registered');
        const dto: UserDTO = { id: makeId(), name, email: email.toLowerCase(), token: makeId() + '.' + Date.now(), passwordHash: hashPassword(password) };
        await LocalAuthSource.saveUsers([...users, dto]); await LocalAuthSource.setSession(dto); return toUser(dto);
    }
    async logout(): Promise<void> { await LocalAuthSource.setSession(null); }
    async currentUser(): Promise<User | null> { const dto = await LocalAuthSource.getSession(); return dto ? toUser(dto) : null; }
}