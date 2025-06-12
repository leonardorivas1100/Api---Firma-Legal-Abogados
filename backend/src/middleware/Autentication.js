import jwt from 'jsonwebtoken';

// Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 
            'Token de autenticación no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Decodificamos el token y lo adjuntamos a la solicitud
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
};

// Middleware para verificar el rol del usuario
const verifyRole = (rolesPermitidos) => (req, res, next) => {
    const userRole = req.user.nombre_rol;  
    // Si el rol del usuario está en la lista de roles permitidos, continúa
    if (rolesPermitidos.includes(userRole)) {
        return next();
    }

    return res.status(403).json({ message: 'Acceso denegado' });
};


// Exportando las funciones
export { verifyToken, verifyRole };
