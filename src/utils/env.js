const getEnv = (key) => {
    const value = process.env[key]

    if(!value) throw new Error(`variable ${key} not found`)

    return value
}

export default getEnv