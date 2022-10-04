export function GetBaseURL() {
    // return "https://api.dikpora.dompukab.go.id"
    return "http://127.0.0.1:8000"
}

export function GetHeaderNoAuth() {
    return { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
}
