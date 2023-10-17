const asyncHandle = fn => (res, req, next) => {
    Promise.resolve(fn(res, req, next).catch(next))
}

module.exports = asyncHandle
