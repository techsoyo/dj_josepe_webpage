'use client';

import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contacto - DJ Josepe',
  description:
    'Envíanos tu consulta y reserva al DJ Josepe para tu próximo evento.',
};

/**
 * Contact page provides a detailed form allowing users to submit
 * enquiries.  The form leverages the contact service to send data to
 * the backend.
 */
export default function ContactPage() {
  return (
    <div className="section bg-dark text-light">
      <div className="container">
        <h1 className="text-center mb-4 text-warning">Contacto</h1>
        <p className="mb-4 text-center">
          ¿Tienes alguna pregunta o quieres reservar al DJ Josepe para tu próximo
          evento?  Completa el siguiente formulario y nos pondremos en contacto
          contigo lo antes posible.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}