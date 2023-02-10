export default async (url, { body, auth, ...rest } = {}) => {
    try {
        const headers = { 'Content-Type': 'application/json' }
        if (auth) {
            headers.Authorization = `Bearer ${auth}`
        }
        const config = {
            method: body ? 'POST' : 'GET',
            ...rest,
            headers: {
                ...headers,
                ...rest.headers,
            },
        }
        if (body) {
            config.body = JSON.stringify(body)
        }

        let response = await fetch(url, config)

        let text = await response.text()
        let data
        let contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
            try {
                data = JSON.parse(text)
                text = undefined
            } catch (e) { }
        }

        let { ok, status, statusText } = response
        let result = { ok, status, statusText }
        if (ok) {
            result = { ...result, data, text }
        } else {
            let { error, ...rest } = data || {}
            result.error = {
                message: text || statusText,
                ...rest,
                ...error,
            }
        }
        return result
    } catch(e) {
        return {
            error: {
                message: e.message || e.toString(),
                cause: e.cause && {
                    message: e.cause.message || e.cause.toString(),
                    ...e.cause,
                },
            },
            status: 502,
        }
    }
}