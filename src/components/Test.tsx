function Test() {
    const getApi = async() => {
        try {
            const response = await fetch("http://localhost:8080/test", {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept": "application/json",
                },
                mode: "cors",
                credentials: "include"
            });
            console.log("reponse:", response.text());

        } catch (error) {
            console.log("error");
        }
    }

    return (
        <>
            <p>child component</p>
            <button onClick={getApi}>GETAPI実行</button>
        </>
    )
}

export default Test;