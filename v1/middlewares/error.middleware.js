export const errorMiddleware = (err, req, res, next) => {
    //eliminar el stack
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal server error', details: err.details || null });
}