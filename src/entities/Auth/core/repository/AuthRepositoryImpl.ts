import exp from "constants";
import { UserEntity } from "../entity";

interface AuthRepositoryImpl {
  login(): Promise<void>;
  logout(): Promise<void>;
  getUserInfo(): Promise<UserEntity | undefined>;
}

export default AuthRepositoryImpl;
