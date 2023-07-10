export const Url=(ruta)=>{
    const base="https://autosi-kowa-production.up.railway.app/"
    return base+ruta
}

export const HeaderRuta=(access)=>{
    const obj={"Content-Type":"application/json",
    "x-access-token":access,
    "Accept":"*/*",
    "Accept-Encoding":"gzip, deflate, br"
 }
    return obj
}