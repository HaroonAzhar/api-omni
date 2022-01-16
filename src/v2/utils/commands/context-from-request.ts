import { Request } from 'express';

import { CommandContext } from './base-command.interface';

export const contextFromRequest = (req: Request): CommandContext => {
  const context: CommandContext = {
    Trigger: `${JSON.stringify(req.method)} ${JSON.stringify(req.url)} ${JSON.stringify(req.params)}, ${JSON.stringify(
      req.body
    )}`,
    User: req.user,
  };
  return context;
};
