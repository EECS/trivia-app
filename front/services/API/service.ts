export const API_GET = async (url: string) => {
    return await fetch(url)
}

export const API_POST_JSON = async (url: string, data: ReadableStream<Uint8Array>) => {
    return await fetch(url, {
        body: data
    })
}