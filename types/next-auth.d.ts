import "next-auth";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
