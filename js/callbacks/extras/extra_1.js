function validateInput(number, onSuccess, onError) {
    if (number > 0) {
        onSuccess(`Valid number: ${number}`);
    } else {
        onError(`Invalid number: ${number}`);
    }
}

function successCallback(message) {
    console.log(message);
}

function errorCallback(message) {
    console.log(message);
}

validateInput(2, successCallback, errorCallback);
validateInput(-1, successCallback, errorCallback);
validateInput(0, successCallback, errorCallback);