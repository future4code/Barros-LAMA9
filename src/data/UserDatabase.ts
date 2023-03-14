import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  private static NOME_TABELAS_USUÁRIOS = "NOME_TABELAS_USUÁRIOS";

  public async createUser(id: string, email: string, name: string, password: string, role: string): Promise<void> {
    try {
      await BaseDatabase.connection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.NOME_TABELAS_USUÁRIOS);
        
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await BaseDatabase.connection()
      .select("*")
      .from(UserDatabase.NOME_TABELAS_USUÁRIOS)
      .where({ email });

    return User.toUserModel(result[0]);
  }

  public findUser = async (email: string) => {
    try {
      const result = await UserDatabase.connection(UserDatabase.NOME_TABELAS_USUÁRIOS)
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

}
