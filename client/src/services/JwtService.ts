 class JwtService {
  private static tokenName = 'token'

  public static getToken():string | null {
    return localStorage.getItem(this.tokenName)
  }

  public static setToken(token:string): void {
    return localStorage.setItem(this.tokenName, token)
  }

  public static clearToken(): void {
    return localStorage.removeItem(this.tokenName)
  }
}

export default JwtService