const nodemailer = require('nodemailer');
const Queue = require('bull');

const emailQueue = new Queue('emailQueue', {
    redis: {
        host: 'localhost',
        port: 6379
    }
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = (from, recipient, subject, html, delay) => {
    const message = {
        from,
        to: recipient,
        subject,
        html
    };

    emailQueue.add(message, { delay });
};

emailQueue.process(async (job, done) => {
    try {
        await transporter.sendMail(job.data);
        console.log('Email sent to', job.data.to);
        done();
    } catch (error) {
        console.error('Error sending email to', job.data.to, ':', error.message);
        done(error);
    }
});

module.exports = sendEmail;
