export const SECRET_KEY: Readonly<string> = typeof process.env.NEXT_PUBLIC_SECRET_KEY !== "undefined" ? process.env.NEXT_PUBLIC_SECRET_KEY : ""
export const ACCESS_KEY: Readonly<string> = typeof process.env.NEXT_PUBLIC_ACCESS_KEY !== "undefined" ? process.env.NEXT_PUBLIC_ACCESS_KEY : ""
export const UNSPLASH_OAUTH_BASE_URL: Readonly<string> = "https://unsplash.com/oauth/"
export const UNSPLASH_API_BASE_URL: Readonly<string> = "https://api.unsplash.com/"


export const apiUrls: Readonly<Record<string, string>> = {
    unsplashAuthorizeUrl: `${UNSPLASH_OAUTH_BASE_URL}authorize?client_id=${ACCESS_KEY}&scope=public+read_user+write_likes&response_type=code&redirect_uri=`,
    unsplashTokenUrl: `${UNSPLASH_OAUTH_BASE_URL}token`,
    unsplashProfile: `${UNSPLASH_API_BASE_URL}/me`,
    unsplashLike: `${UNSPLASH_API_BASE_URL}photos/`,
    unsplashSearchPhotos: `${UNSPLASH_API_BASE_URL}search/photos`
}