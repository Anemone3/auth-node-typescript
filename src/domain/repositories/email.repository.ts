


export interface EmailRepository {
    sendEmail(destination: string, title: string, text: string, html: string): Promise<void>
}