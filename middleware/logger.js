const logger = store => next => action => {
    console.group(action.type);
    const returnValue = next(action);
    console.log("The next state: ", returnValue);
    console.groupEnd();
    return returnValue;
};

export default logger;