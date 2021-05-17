export const getErrors = ({ errors, error_type }) => {

    let validationErrors = []
    let generalErrors = []

    switch (error_type) {
        case 'ValidationError':
            validationErrors = errors
            break;

        default:
            generalErrors = errors
            break;
    }

    return {
        generalErrors,
        validationErrors,
        totalErrors: generalErrors && validationErrors ? generalErrors.length + validationErrors.length : 0
    }
}
