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

export function validateNigeriaPhoneNumber(
  phoneNumber: string,
): boolean {
  // Regular expression for validating a Nigerian phone number
  const nigeriaPhoneRegex =
    /^(\+234|0)([789][01]|70|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|820|821|822|823|824|825|826|827|828|829|830|831|832|833|834|835|836|837|838|839|840|841|842|843|844|845|846|847|848|849|850|851|852|853|854|855|856|857|858|859|860|861|862|863|864|865|866|867|868|869|870|871|872|873|874|875|876|877|878|879|880|881|882|883|884|885|886|887|888|889|890|891|892|893|894|895|896|897|898|899|909)[0-9]{7}$/;
  return nigeriaPhoneRegex.test(phoneNumber);
}
