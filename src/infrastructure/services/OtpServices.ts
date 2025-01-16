import { createClient } from "redis";
import { OtpRepository } from "../../domain/repositories/otp.repository";



export class OPTService implements OtpRepository {
  private redis!: ReturnType<typeof createClient>;

  constructor() {
    const client = createClient({
      url: 'redis://default:ST2PueJO87YntA67qBs0Hx6EibTejDpV@redis-18035.c329.us-east4-1.gce.redns.redis-cloud.com:18035',
    })
    client.connect().then((connectedClient) => {
      this.redis = connectedClient;
    }).catch(err => console.log('Error redis: ', err));
  }

  generateOTP(): string {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  }

  async saveOTP(email: string, otp: string, ttl: number = 300): Promise<void> {
    try {
      
      console.log(`Saving Otp: ${email} , otp: ${otp}`);
      
      await this.redis.set(email, otp, { EX: ttl });
    } catch (error) {
      console.log('error redis set',error);
      
      throw Error("Failed to save OTP in Redis");
    }
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const storeOtp = await this.redis.get(email);
    console.log("el otp es:", storeOtp);

    if (storeOtp === otp) {
      console.log(`otp: ${otp} y eliminando el email key: ${email}`);
      await this.redis.del(email);
      return true;
    }

    return false;
  }

  // todo: limitar las peticiones
}
