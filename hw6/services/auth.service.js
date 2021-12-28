export class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async auth(user) {
        const { login, password } = user;

        return await this.userModel.findOne({ where: { login, password } });
    }
}
