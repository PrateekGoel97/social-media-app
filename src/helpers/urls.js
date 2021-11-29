const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2';

export const APIUrls = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,
    fetchPosts: () => `${API_ROOT}/posts?page=1&limit=100`,
    editProfile: () => `${API_ROOT}/users/edit`,
    userProfile: (userId) => `${API_ROOT}/users/${userId}`,
    userFriends: (userId) => `${API_ROOT}/friendship/fetch_user_friends`,
    addFriend: (userId) => `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
    removeFriend: (userId) => `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
}