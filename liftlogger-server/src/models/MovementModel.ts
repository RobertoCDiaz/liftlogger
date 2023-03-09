import { Movement } from "@prisma/client";

export type MovementCreationParams = Omit<Movement, 'id' | 'user_email' | 'description'> & {
  description?: string;
};
