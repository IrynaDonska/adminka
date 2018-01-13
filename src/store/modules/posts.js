const posts = {
    state: {
        data: []
    },
    getters: {
        posts(state) {
            return state.data
        }
    },
    
    mutations: {
        addBlogPost(state, post) {
            state.data.push(post)
        }
    },
    actions: {
    }
}
  export default posts
  