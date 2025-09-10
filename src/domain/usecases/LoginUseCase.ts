import { AuthRepository } from '../repositories/AuthRepository';
import { User } from '../entities/User';
export class LoginUseCase {
    constructor(private repo: AuthRepository) { }
    execute(email: string, password: string): Promise<User> { return this.repo.login(email, password); }
}