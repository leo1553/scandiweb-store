export class LocalStorageService {
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if(data) 
      return JSON.parse(data);
    return null;
  }
    
  set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
    
  clear(key: string): void {
    localStorage.removeItem(key);
  }
}

export const localStorageService = new LocalStorageService();
