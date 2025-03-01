export const useApi = () => {
    return {

    getApi: async (url: string, accessToken: string) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            mode: "cors",
            credentials: "include"
    
        });
        if (!response.ok) {
            throw new Error(`API呼び出しに失敗しました。 status: ${response.status}`);
        }
        return response.json();
    },
    
    postApi: async (url: string, accessToken: string, body: any) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
    }
}

}


