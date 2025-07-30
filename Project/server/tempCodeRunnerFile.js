app.post('/resendOtp', wrapAsync(async (req, res) => {
  const { id, email } = req.body;
  const user = await Contact.findById(id);
  if (!user || user.email !== email) {
    return res.status(404).send({ error: 'User not found or email mismatch' });
  }
  const newOtp = generateOTP();
  user.otp = newOtp;
  await user.save();

  await Layout(
    email,
    'Resent OTP for verification',
    'Rockford User',
    `Your new OTP is:<br/><br/><strong>${newOtp}</strong><br/><br/>Please verify and do not share this code.`
  );

  res.send({ message: 'New OTP sent successfully' });
}));