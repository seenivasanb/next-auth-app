import bcrypt from 'bcrypt';

export const hashPassword = async (password: any) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}