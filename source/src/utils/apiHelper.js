const handleApiResponse = (result, onCompleted, onError) => {
    const { success, responseData } = result;
    if(success && responseData.result)
        onCompleted(responseData);
    else
        onError(responseData);
}


const handleApiResponseEx = (result, onCompleted, onError) => {
    const { success, responseData } = result;
    if(success)
        onCompleted(responseData);
    else
        onError(responseData);
}

export {handleApiResponse, handleApiResponseEx };