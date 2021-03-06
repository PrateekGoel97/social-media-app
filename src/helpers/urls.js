const API_ROOT = `/api/`;

export const APIUrls = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,
    fetchPosts: () => `${API_ROOT}/posts?page=1&limit=25`,
    editProfile: () => `${API_ROOT}/users/edit`,
    userProfile: (userId) => `${API_ROOT}/users/${userId}`,
    userFriends: (userId) => `${API_ROOT}/friendship/fetch_user_friends`,
    addFriend: (userId) => `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
    removeFriend: (userId) => `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
    createPost: () => `${API_ROOT}/posts/create`,
    createComment: () => `${API_ROOT}/comments/`,
    toggleLike: (id,likeType) => `${API_ROOT}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
    searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
    destroyComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`
}
