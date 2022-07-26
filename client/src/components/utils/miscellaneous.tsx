export const truncateString = (str: string | null, num: number = 25) =>
    str && str.length > num ? str.slice(0, num) + "..." : str