export const API_Get = async (url: string) => {
    return await fetch(url)
}

export const API_Post_Json = async (url: string, data: any) => {
    return await fetch(url, {
        method: "POST",
        body: data
    })
}