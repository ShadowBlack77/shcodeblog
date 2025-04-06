import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

  constructor(private readonly _mailerService: MailerService) {}

  async sendMail(
    to: string,
    subject: string,
    context: string
  ) {
    try {
      await this._mailerService.sendMail({
        to,
        from: 'shadowblack77.dev@gmail.com',
        subject,
        template: 'reset-password',
        context: { link: context }
      });

      return { content: 'email sended successfylly' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
