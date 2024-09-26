import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const startTime = Date.now();

    //요청이 완료된후 로그 기록
    res.on('finish', () => {
      const elapsedTime = Date.now() - startTime;
      const statusCode = res.statusCode;
      const level = this.getLogLevel(statusCode); // 상태 코드에 따라 로그 레벨 설정

      // 로그 출력 (여기선 console.log, 실제로는 로그 파일이나 외부 시스템으로 전송 가능)
      console.log({
        level,
        message: `${method} ${url} ${statusCode} - ${elapsedTime}ms`,
        timestamp: new Date().toISOString(),
      });
    });

    next();
  }

  private getLogLevel(statusCode: number): string {
    if (statusCode >= 500) {
      return 'critical';
    } else if (statusCode >= 400) {
      return 'error';
    } else if (statusCode >= 300) {
      return 'warn';
    } else if (statusCode >= 200) {
      return 'info';
    }
    return 'debug';
  }
}