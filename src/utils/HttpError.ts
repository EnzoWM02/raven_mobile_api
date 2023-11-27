export default class HttpError extends Error {
  status: number;

  constructor(message: string, status?: number, error?: unknown) {
    let errorMsg = message + '\n';
    if (error && error instanceof Error) {
      errorMsg += error.stack;
    } else if (error) {
      errorMsg += String(error);
    }

    super(errorMsg);
    this.status = status ?? 500;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
