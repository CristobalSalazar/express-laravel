export default class HttpError {
  public statusCode: number
  public message: string

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode
    this.message = message
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request') {
    super(400, message)
  }
}
