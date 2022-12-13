const expiredTime = ';expires=Thu, 01 Jan 1970 00:00:00 GMT';

export function getCookieValue(name) {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop();
}

export function setCookie({ name, value, maxAge, expires, path, domain,secure,sameSite }) {

    let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if (expires instanceof Date) {
        cookieText += '; expires=' + expires.toUTCString();
    }
    if (maxAge) {
        cookieText += '; max-age=' + maxAge;
    }
    if (path) {
        cookieText += '; path=' + path;
    }
    if (domain) {
        cookieText += '; domain=' + domain;
    }
    if (secure) {
        cookieText += '; secure';
    }
    if (sameSite) {
        cookieText += '; samesite=' + sameSite;
    }

    document.cookie = cookieText;
}

export function cookieHasValue(name, value) {
    return document.cookie.split(';')
        .some(item => item.trim().indexOf(name + '=' + value.trim()) == 0
        );
}

export function cookieExists(name) {
    return document.cookie.split(';')
        .some(item => item.trim().indexOf(name + '=') == 0
        );
}

export function deleteCookie(name, path, domain) {
    if (cookieExists(name)) {
        document.cookie = name + '=' +
            ((path) ? ';path=' + path : '') +
            ((domain) ? ';domain=' + domain : '') +
            expiredTime;
    }
}

export function deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=' + expiredTime;
    }
}