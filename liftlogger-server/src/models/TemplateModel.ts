import { Template } from "@prisma/client";

export type TemplateCreationParams = Omit<Template, 'id' | 'user_email' | 'description'> & {
  description?: string;
};
