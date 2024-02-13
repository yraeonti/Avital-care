export const forgotPassword = (name: string, link: string) => (
    `
<p>Password Reset Request for Avita Health account,</p>
<p>Dear ${name},

<p>To reset your password, click ${link}. This link is valid for 1 (one) hour. If you didn't make this request, please ignore.</p>

<p>For a secure password, use a mix of uppercase, lowercase, numbers, and symbols. Contact us support@avitahealthng.com or +2347048391801 for assistance.</p>

<p>Best regards,</p>
`
)

export const signUpMail = (name: string) => (
    `
    <p>Welcome to Avita Health - Your Health, Our Priority!</p>

<p>Dear ${name},

<p>Thank you for choosing Avita Health System for your healthcare needs. We are thrilled to welcome you to our community.</p>

<p>Your account has been successfully created, and we are dedicated to providing you with top-notch medical services. Your health is our priority, and we are committed to ensuring a seamless and secure experience for you.</p>

<p>As a special gesture, our CEO, Babalola Elijah M.D, will personally reach out to you soon to welcome you aboard and address any queries or feedback you may have.</p>

<p>Feel free to explore the various features of our platform, schedule appointments, and manage your health information conveniently.</p>

<p>If you have any immediate concerns, our support team is here to assist you. Simply reach out to us at support@avitahealthng.com or +234708391801</p>

<p>Once again, thank you for choosing Avita Health Nigeria. We look forward to being your trusted partner on your healthcare journey.</p>

<p>Best regards,</p>

<p>Avita Health Support Team.</p>
    `
)