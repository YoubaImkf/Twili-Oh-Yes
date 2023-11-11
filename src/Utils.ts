export function isNotDefined(str: string): boolean {
    return !str;
}

export function ContainsSpaces(str: string): boolean {
    return str.includes(' ');
}

export function isNegativeNumber(nbr: number): boolean {
    return nbr < 0;
}

export function isArrayEmpty<T>(array: T[]): boolean {
    return array.length === 0;
}