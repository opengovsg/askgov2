import {Officer} from "./officer";
import {User} from "./user";

export interface WhoamiResult {
  currentUser: User | null
  currentOfficer: Officer | null
}