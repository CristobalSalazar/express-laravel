export default class HttpError {
  public statusCode: number;
  private message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  getError() {
    return {
      status: this.statusCode,
      message: this.message,
    };
  }
}
