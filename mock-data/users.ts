import { Role } from '../utils/constants';

export interface User {
    id: string;
    name: string;
    role: Role;
    email: string;
    department?: string;
    avatar?: string;
}

export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'Dr. Sarah Smith',
        role: 'super-admin',
        email: 'sarah@college.edu',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=0D8ABC&color=fff'
    },
    {
        id: 'u2',
        name: 'Prof. John Doe',
        role: 'admin',
        email: 'john.cs@college.edu',
        department: 'Computer Science',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
    },
    {
        id: 'u3',
        name: 'Ms. Emily White',
        role: 'faculty',
        email: 'emily.white@college.edu',
        department: 'Computer Science',
        avatar: 'https://ui-avatars.com/api/?name=Emily+White&background=random'
    },
    {
        id: 'u4',
        name: 'Michael Brown',
        role: 'student',
        email: 'michael.b@student.college.edu',
        department: 'Computer Science',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=random'
    }
];
