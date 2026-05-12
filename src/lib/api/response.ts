export function apiResponse<T>(data: T, init?: ResponseInit, meta?: any) {
  return Response.json(
    {
      success: true,
      data,
      ...(meta && { meta }),
    },
    init
  );
}

export function apiError(code: string, message: string, status: number = 500, details?: any) {
  return Response.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
    },
    { status }
  );
}
