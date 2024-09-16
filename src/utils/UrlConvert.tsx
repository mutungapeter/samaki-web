interface Props{
    url:string;
}
export const convertToHttps=({url}:Props)=> {
    if (url?.startsWith('http://')) {
        return url.replace('http://', 'https://');
    }
    return url;
}

