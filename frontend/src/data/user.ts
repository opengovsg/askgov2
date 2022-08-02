export interface User {
  id: number;
  login: string;
  name: string;
  position?: string;
  headline: string;
  canScreen: boolean;
  canAnswer: boolean;
}