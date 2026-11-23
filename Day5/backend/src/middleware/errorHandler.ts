import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Error:", err);

  const statusCode =
    typeof err.status === "number" ? err.status : 500;

  const message =
    err instanceof Error ? err.message : "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;