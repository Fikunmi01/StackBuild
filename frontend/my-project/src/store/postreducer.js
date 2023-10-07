function postReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_POST': {
            // Add a new post to the state
            return [...state, action.payload];
        }
        case 'UPDATE_POST': {
            const { index, updatedPost } = action.payload;
            // Update the post at the specified index
            return state.map((post, i) => {
                if (i !== index) return post;

                return {
                    ...post,
                    ...updatedPost, // Update post properties with the new values
                };
            });
        }
        case 'DELETE_POST': {
            const { index } = action.payload;
            // Remove the post at the specified index
            return state.filter((post, i) => i !== index);
        }
        default:
            return state;
    }
}