export function gqlErrors(err) {
    const hasInternal = errors => errors.some(e => e.internal);
    const replaceInternal = (errors, err) =>
        hasInternal(errors) ? errors.filter(e => !e.internal).concat(err) : errors;

    return replaceInternal((err?.graphQLErrors || []).map(error => {
        if ("validation" === error.extensions?.category) {
            console.log(Object.keys(error.extensions?.validaton || {}));

            Object.keys(error.extensions?.validaton || {});

        }

       return {
            message: error.message,
            internal: Boolean(!(error?.path?.length))
        }
    }), {
        message: 'Something bad happened'
    });
}
