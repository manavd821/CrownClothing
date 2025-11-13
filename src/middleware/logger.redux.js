export const customeLogger = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }
    console.log('type:', action.type);
    console.log('action:', action);
    console.log('prev state:', store.getState());
    const result = next(action);
    console.log('next state:', store.getState());
    return result;
}