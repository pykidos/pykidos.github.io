
/*************************************************************************************************/
/* Utils                                                                                         */
/*************************************************************************************************/

export function clamp(x, min, max) {
    return Math.min(max, Math.max(min, x));
}

export function encode(obj) {
    if (!obj) return '';
    const jsonStr = JSON.stringify(obj);
    const utf8Str = unescape(encodeURIComponent(jsonStr)); // Convert to UTF-8
    const compressed = pako.deflate(utf8Str); // Use deflate compression
    const base64Encoded = btoa(String.fromCharCode.apply(null, compressed));
    return base64Encoded;
}

export function decode(encoded) {
    if (!encoded) return {};
    const compressed = atob(encoded);
    const arr = Uint8Array.from(compressed, char => char.charCodeAt(0));
    const inflated = pako.inflate(arr, { to: 'string' });
    const utf8Str = decodeURIComponent(escape(inflated)); // Convert from UTF-8
    return JSON.parse(utf8Str);
}
