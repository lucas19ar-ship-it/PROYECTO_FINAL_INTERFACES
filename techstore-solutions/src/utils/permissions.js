// esta funcion decide que debe verse segun el rol, y testear esa funcion //
export function canSeeCart(isAuthenticated, role) {
    return isAuthenticated && role === 'cliente'
}


export function canManageProducts(isAuthenticated, role) {
    return isAuthenticated && role === 'admin'
}


export function canManageUsers(isAuthenticated, role) {
    return isAuthenticated && role === 'admin'
}

