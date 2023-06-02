import { createTransport } from 'nodemailer';

const transporter = createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
});

function sendEmail(to: string, subject: string, content: string) {
	const options = {
		from: process.env.EMAIL_ADDRESS,
		to: to,
		subject: subject,
		text: content,
	};

	transporter.sendMail(options, (err, info) => {
		if (err) {
			return err;
		} else {
			return info;
		}
	});
}

export { sendEmail };
