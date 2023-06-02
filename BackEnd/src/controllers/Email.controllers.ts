import { sendEmail } from '../services/nodemailer';
import { Request, Response } from 'express';

function email(req: Request, res: Response) {
	const address = req.body.address;
	const subject = req.body.subject;
	const content = req.body.content;

	try {
		sendEmail(address, subject, content);
		res.status(200).json({ message: 'Email sent' });
	} catch (err) {
		res.status(400).json(err);
	}
}

export { email };
