
export const delay = (duration: number): Promise<void> => new Promise(res => setTimeout(res, duration));
