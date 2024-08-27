import { HttpInterceptorFn } from "@angular/common/http";

export const LoggerInterceptor: HttpInterceptorFn = (req, next) => {
    console.log("logger in action");
    return next(req);
}