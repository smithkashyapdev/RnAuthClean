import { AuthRepository } from '../repositories/AuthRepository';
import { User } from '../entities/User';
export class SignupUseCase {
    constructor(private repo: AuthRepository) { }
    execute(name: string, email: string, password: string): Promise<User> { return this.repo.signup(name, email, password); }
}