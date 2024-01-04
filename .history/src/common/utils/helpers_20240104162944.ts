/* eslint-disable prettier/prettier */
// export async validateEmail(email: string) {
//     const emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
//     if (!email.match(emailRegex)) {
//       throw new NotFoundException('Invalid email');
//     }

export function cleanPhone(phone: string) {
  return phone.replace('+234', '0');
}

export function validateEmail(
  email: string,
): boolean {
  // Regular expression for validating an Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
