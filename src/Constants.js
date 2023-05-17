const dev = {
    url: {
        API_BASE_URL: "http://localhost:8080"
    }
}

export const config = process.eventNames.NODE_ENV === 'development' ? dev : prod;

