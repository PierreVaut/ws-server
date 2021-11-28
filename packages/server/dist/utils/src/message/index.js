export const createMessage = (message, userName = 'anonymous') => {
    const date = Date.now();
    return ({ message, userName, date });
};
//# sourceMappingURL=index.js.map