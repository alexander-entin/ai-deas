export default set => {
    let x
    set(y => x = y)
    return x
}