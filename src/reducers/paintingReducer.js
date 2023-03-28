export const paintingReducer = (state, action) => {
    switch (action.type) {
        case 'PAINTING_FETCH':
            // return Object.assign({}, action.payload);
            return { ...action.payload };
        case 'REVIEW_ADD':
            return {
                ...state,
                reviews: [
                    ...state.reviews,
                    {
                        ...action.payload,
                        author: {
                            email: action.userEmail,
                        }
                    }
                ],
            }
        default:
            return state;
    }
};