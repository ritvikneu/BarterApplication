export const HaveActionType = {
    GET_ALL_HAVES: 'GET_ALL_HAVES',
    GET_SINGLE_HAVE: 'GET_SINGLE_HAVE',
    RESET_HAVE: 'RESET_HAVE',
    CREATE_HAVES: 'CREATE_HAVES',
    UPDATE_HAVES: 'UPDATE_HAVES',
    DELETE_HAVES: 'DELETE_HAVES',
    HAVES_ERROR: 'HAVES_ERROR',
}

export const getAllHaves = havesList => ({
    type: HaveActionType.GET_ALL_HAVES,
    havesList,
});

export const getSingleHave = have => ({
    type: HaveActionType.GET_SINGLE_HAVE,
    have,
});

export const createHave = have => ({
    type: HaveActionType.CREATE_HAVES,
    have
});

export const updateHave = (have, id) => ({
    type: HaveActionType.UPDATE_HAVES,
    have,
    id,
});

export const deleteHave = id => ({
    type: HaveActionType.DELETE_HAVES,
    id
});

export const resetHave = have => ({
    type: HaveActionType.RESET_HAVE,
    have
});

export const havesError = error => ({
    type: HaveActionType.HAVES_ERROR,
    error,
});