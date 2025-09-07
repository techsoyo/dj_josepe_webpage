'use client'
import { useState } from 'react'
import styles from '../styles/minimalist.module.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    location: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    setTimeout(() => {
      setSubmitMessage('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.')
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        eventType: '',
        date: '',
        location: '',
        message: ''
      })
    }, 2000)
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.introWhiteWrapper}>
        <p className={styles.introWhiteText}>Ponte en contacto conmigo para tus eventos DJ.</p>
      </div> */}
      <div className={styles.formCard}>
        <div className={styles.form}>
          <h2 className={styles.title}>Contáctame</h2>

          <form onSubmit={handleSubmit} className={styles.formInner}>
            <div className={styles.formGrid}>
              <div className={styles.formField}>
                <label htmlFor="name" className={styles.label}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="email" className={styles.label}>
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="eventType" className={styles.label}>
                  Tipo de Evento
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="boda">Boda</option>
                  <option value="cumpleanos">Cumpleaños</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="fiesta">Fiesta Privada</option>
                  <option value="club">Club/Night</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className={styles.formField}>
                <label htmlFor="date" className={styles.label}>
                  Fecha del Evento
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formField} ${styles.colSpan2}`}>
                <label htmlFor="location" className={styles.label}>
                  Ubicación
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Ciudad, lugar del evento"
                />
              </div>

              <div className={`${styles.formField} ${styles.colSpan2}`}>
                <label htmlFor="message" className={styles.label}>
                  Mensaje Detallado *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  rows="4"
                  required
                  placeholder="Cuéntanos sobre tu evento, estilo musical preferido, duración, etc."
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </div>

            {submitMessage && (
              <div className={styles.submitMessage}>
                {submitMessage}
              </div>
            )}
          </form>


        </div>
      </div>
    </div>
  )
}