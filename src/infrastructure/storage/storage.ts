import { UserDTO } from '../../data/models/UserDTO';
import { User } from '../../domain/entities/User';
export const hashPassword = (pwd: string) => { let h = 0; for (let i = 0; i < pwd.length; i++) { h = (h << 5) - h + pwd.charCodeAt(i); h |= 0; } return String(h); };
export const makeId = () => Math.random().toString(36).slice(2, 10);
export const toUser = (dto: UserDTO): User => ({ id: dto.id, name: dto.name, email: dto.email, token: dto.token });