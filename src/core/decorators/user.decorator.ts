import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to retrieve the current authenticated user from the metadata
 *
 * @param {unknown} data Data properties for the metadata
 * @param {ExecutionContext} ctx Execution context
 */
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const metadata = ctx.switchToRpc().getContext();
    const user = metadata.user;

    return data ? user[`${data}`] : user;
  },
);
