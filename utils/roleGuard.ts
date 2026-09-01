import { Role } from './constants';

export function isAuthorized(userRole: Role, allowedRoles: Role[]): boolean {
    return allowedRoles.includes(userRole);
}

export function getDashboardRoute(role: Role, system?: string | null): string {
    if (system === 'student-erp') {
        if (role === 'student' || role === 'super-admin') return '/dashboard/student-erp';
    }
    
    switch (role) {
        case 'super-admin': return '/dashboard/super-admin';
        case 'admin': return '/dashboard/admin';
        case 'faculty': return '/dashboard/faculty';
        case 'student': return '/dashboard/student';
        default: return '/login';
    }
}
