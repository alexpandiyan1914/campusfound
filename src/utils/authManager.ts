let logoutHandler: (() => Promise<void>) | null = null;

export const registerLogout = (
  handler: () => Promise<void>
) => {
  logoutHandler = handler;
};

export const forceLogout = async () => {
  if (logoutHandler) {
    await logoutHandler();
  }
};