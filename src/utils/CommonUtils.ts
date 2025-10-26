/**
 * Returns the initials from a given name string
 * @param name Full name string (e.g., "John Doe" or "John")
 * @returns Initials (e.g., "JD" or "J")
 */
export function getInitials(name: string): string {
    if (!name) return '';
    
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
}

/**
 * Returns a random color in hexadecimal format
 * @returns A color in hex format (e.g., "#FF0000")
 */
export function getRandomPrimaryColor(): string {
   
    
 const randomColor = Math.floor(Math.random()*16777215).toString(16);
     return "#" + randomColor as string;
}
