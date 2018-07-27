import { Request, Response } from 'express';

class SessionHelpersClass {
  static hasToken(request: Request, response: Response, next: Function) {
    const token = request.headers['x-access-token'] || request.headers.token || request.query.token;
    if (!token) {
      return response.status(401).json({
        message: 'You need to be logged in to view this resource'
      });
    }
    return next();
  }
}

export default SessionHelpersClass;
