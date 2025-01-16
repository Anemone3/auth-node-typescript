

export interface OtpRepository{
    generateOTP():string;
    saveOTP(email:string,otp:string,ttl:number):Promise<void>;
    verifyOtp(email:string, otp:string):Promise<boolean>;
}