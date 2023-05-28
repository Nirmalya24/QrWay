class googleOAuth2 {
    static id: string = process.env.GOOGLE_CLIENT_ID || '';
    static secret: string = process.env.GOOGLE_CLIENT_SECRET || '';

}
export default googleOAuth2;