import { EmailService } from "../../../infrastructure/services/EmailService";
import { CustomError } from "../../errors/custom.error";
import { EmailRepository } from "../../repositories/email.repository";
import { OtpRepository } from "../../repositories/otp.repository";

export abstract class AuthBase {
  constructor(
    private readonly otpRepository: OtpRepository,
  ) {}

  protected async generateAndSendOTP(email: string): Promise<void> {
    // Generar OTP
    try {
      const otp = this.otpRepository.generateOTP();
      console.log(otp)
      if (!otp) {
        throw CustomError.internalServer("Error generating OTP");
      }

      // Guardar OTP en el repositorio
      await this.otpRepository.saveOTP(email, otp, 300);

      // Enviar OTP por correo electrónico
      await EmailService.sendEmail(
        email,
        "Verify Your Account",
        "OTP Verification",
        `<h1>Your OTP is: ${otp}</h1>`
      );
    } catch (error) {
        throw CustomError.internalServer(`Error generating email and sending OTP, stack: ${error}`);
    }
  }
}
