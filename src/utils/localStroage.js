export function setItem(key, value) {
    localStorage.setItem(key, value);
    return localStorage.getItem(key) !== null;
}
  
export function setObject(data) {
    for (const [key, value] of Object.entries(data)) {
        if (setItem(key, value) === false) {
            throw new Error("Failed to set session");
        }
    }
    return true;
}

export function clearStorage() {
    localStorage.clear();
}