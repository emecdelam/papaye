import bcrypt from "bcrypt"
export async function hash(plaintextPassword: string) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash
    // Store hash in the database
}
 
export async function verify(plaintextPassword: string, hash: string) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}