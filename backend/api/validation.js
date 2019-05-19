module.exports = app => {

    function existsOrError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    function equalsOrError(va, vb, msg) {
        if (va !== vb) throw msg
    }
    return { equalsOrError, existsOrError, notExistsOrError }
}