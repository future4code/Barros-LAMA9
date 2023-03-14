import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { BaseError } from "../error/BaseError";
import { AuthenticatorToken } from "../services/Authenticator";

export class UserBusiness {

    async createUser(user: UserInputDTO) {
        try {
            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(user.password);

            const userDatabase = new UserDatabase();
            await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

            const authenticator = new AuthenticatorToken();
            const accessToken = authenticator.generate({ id, role: user.role });
            
            console.log(accessToken)

            return accessToken;

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    
        async getUserByEmail(user: LoginInputDTO) {
    
            const userDatabase = new UserDatabase();
            const userFromDB = await userDatabase.getUserByEmail(user.email);
    
            const hashManager = new HashManager();
            const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());
    
            const authenticator = new AuthenticatorToken();
            const accessToken = authenticator.generate({ id: userFromDB.getId(), role: userFromDB.getRole() });
    
            if (!hashCompare) {
                throw new Error("Invalid Password!");
            }
            return accessToken;
        }
        
}