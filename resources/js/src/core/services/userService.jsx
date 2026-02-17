async function getLoggedInUserSessionData({ signal } = {}) {
    try {
        const response = await axios.get('user_session_data', { signal });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { getLoggedInUserSessionData }
