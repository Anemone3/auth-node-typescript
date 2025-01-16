import nodemailer from "nodemailer";




export class EmailService implements EmailService{


    private constructor(){

    }


    static async sendEmail(destination: string, title: string, text: string, html: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: destination,
            subject: title,
            text: text,
            html: html
        };

        try {
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'castaneda.shiina@gmail.com',
                pass: 'evcfksaupbdkshfy'
            }
        }).addListener( 'error',err=> console.log(`nodemailer error: ${err}`))
    
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }

}