import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
    options.headers = options.headers || {};
    options.method = options.method || 'GET';
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-Token');
    }
    console.log(url)
    const res = await window.fetch(url, options);
    if (res.status >= 400) throw res;

    return res;

}



// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
