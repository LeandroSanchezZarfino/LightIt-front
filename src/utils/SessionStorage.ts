
type StoreKey = "token"

const setKey = (key: StoreKey, value: string) => {
    if (typeof window !== 'undefined') {
        return sessionStorage.setItem(key, value)
    }
}

const getKey = (key: StoreKey) => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem(key)
    }
    return null;
}

const removeKey = (key: StoreKey) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key)
    }
}

export {
    setKey,
    getKey,
    removeKey
}