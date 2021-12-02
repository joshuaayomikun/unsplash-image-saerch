export interface AuthModel {
    id: string,
    updated_at: string,
    username: string,
    first_name: string,
    last_name: string,
    twitter_username: string,
    portfolio_url: string,
    bio: string,
    location: string,
    total_likes: number,
    total_photos: number,
    total_collections: number,
    followed_by_user: boolean,
    downloads: number,
    uploads_remaining: number,
    instagram_username: string,
    email: string
    links: {
      self: string,
      html: string,
      photos: string,
      likes: string
      portfolio: string
    },
    profile_image: {
        large:string,
        small:string,
        medium:string
    },
    name:string
}

export interface TokenRequestBody {
    client_id: string,
    redirect_uri: string,
    grant_type: string,
    code: string,
    client_secret:string
}