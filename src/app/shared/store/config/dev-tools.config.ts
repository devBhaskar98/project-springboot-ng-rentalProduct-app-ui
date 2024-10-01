export interface DevToolsConfig {
  maxAge: number;
  logOnly: boolean;
  autoPause: boolean;
  trace: boolean;
  traceLimit: number;
  connectInZone: boolean;
}
export const createDevToolsConfig = (): DevToolsConfig => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    maxAge: 25, // Retains last 25 states
    logOnly: false, // Restrict extension to log-only mode
    autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    connectInZone: true, // If set to true, the connection is established within the Angular zone
  };
};
