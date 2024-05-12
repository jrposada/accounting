const ALLOWED_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000'];

export function getAccessControlAllowOrigin(
    origin: string | undefined,
): string {
    return origin && ALLOWED_ORIGINS.includes(origin)
        ? origin
        : 'http://localhost:3000';
}
