export const ValidURL = (string) => {
    try {
        new URL(string); 
        return true;
    } catch {
        return false;
    }
}