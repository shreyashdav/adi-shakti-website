import { useEffect, useRef, useState } from 'react'
import About from './About'
import FAQ from './FAQ'

export default function AdiShaktiWebsite() {
  const topRef = useRef(null)
  const consultationRef = useRef(null)
  const formRef = useRef(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [pendingScroll, setPendingScroll] = useState(null)
  const [step, setStep] = useState(1)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    gender: '',
    age: '',
    birthDetails: '',
    location: '',
    problemSummary: '',
    desiredSolution: '',
    additionalDetails: '',
    contact: '',
    email: ''
  })

  const stepLabels = [
    { id: 1, title: 'Personal Details', subtitle: 'व्यक्तिगत विवरण' },
    { id: 2, title: 'Problem Details', subtitle: 'समस्या विवरण' },
    { id: 3, title: 'Contact', subtitle: 'सम्पर्क' }
  ]

  const testimonials = [
    {
      name: 'राधा शर्मा',
      age: '34',
      rating: 5,
      message: 'मुझे बहुत सहारा मिला। यहां पर मैंने सही मार्गदर्शन और स्थायी समाधान दोनों पाया।'
    },
    {
      name: 'अजय वर्मा',
      age: '42',
      rating: 4,
      message: 'समस्या की गहराई से समीक्षा हुई और उचित उपाय सुझाए गए। परिणाम सकारात्मक रहे।'
    },
    {
      name: 'नीतू कुमारी',
      age: '29',
      rating: 5,
      message: 'मेरे परिवार के विवाद का समाधान मिला। अनुभव बहुत अच्छा और भरोसेमंद रहा।'
    },
    {
      name: 'सौरभ सिंह',
      age: '38',
      rating: 5,
      message: 'समस्या का समाधान जल्दी मिला और टीम ने पूरे दिल से सहायता की।'
    }
  ]

  const scrollToHome = () => {
    setCurrentPage('home')
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    setCurrentPage('about')
  }

  const scrollToFAQs = () => {
    setCurrentPage('faq')
  }

  const handleContactNav = () => {
    setCurrentPage('home')
    setPendingScroll('consultation')
  }

  const scrollToConsultation = () => {
    setCurrentPage('home')
    setPendingScroll('consultation')
  }

  useEffect(() => {
    if (currentPage === 'home' && pendingScroll === 'consultation') {
      consultationRef.current?.scrollIntoView({ behavior: 'smooth' })
      setPendingScroll(null)
    }
  }, [currentPage, pendingScroll])

  const validateStep = (currentStep) => {
    const value = (name) => formValues[name]?.toString().trim()

    if (currentStep === 1) {
      return Boolean(value('name') && value('birthDetails') && value('location'))
    }

    if (currentStep === 2) {
      return Boolean(value('problemSummary'))
    }

    if (currentStep === 3) {
      return Boolean(value('contact'))
    }

    return true
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const canGoToStep = (targetStep) => {
    if (targetStep === 1) return true
    if (targetStep === 2) return validateStep(1)
    if (targetStep === 3) return validateStep(1) && validateStep(2)
    return false
  }

  const validateAll = () => {
    const required = ['name', 'birthDetails', 'location', 'problemSummary', 'contact']
    return required.every((field) => formValues[field]?.toString().trim())
  }

  const handleStepClick = (targetStep) => {
    if (targetStep === step) return
    if (!canGoToStep(targetStep)) {
      setStatusType('error')
      setStatusMessage('पहले पिछले चरणों की जानकारी भरें। / Please complete the previous steps first.')
      return
    }
    setStatusMessage('')
    setStep(targetStep)
  }

  const handleNext = () => {
    if (!validateStep(step)) {
      setStatusType('error')
      setStatusMessage('पहले आवश्यक फ़ील्ड भरें / Please fill the required fields first.')
      return
    }
    setStatusMessage('')
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateAll()) {
      setStatusType('error')
      setStatusMessage('कृपया सभी आवश्यक जानकारी भरें। / Please fill all required details.')
      return
    }

    setIsSubmitting(true)
    setStatusMessage('')
    setStatusType('')

    try {
      const payload = {
        ...formValues,
        _captcha: 'false'
      }

      const response = await fetch('https://formsubmit.co/shreyash.davkhag@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(payload)
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setStatusType('success')
      setStatusMessage('Details have been sent. We will contact you soon. / आपकी जानकारी भेज दी गई है। हम जल्द ही आपसे संपर्क करेंगे।')
      setToastVisible(true)
      setFormValues({
        name: '',
        gender: '',
        age: '',
        birthDetails: '',
        location: '',
        problemSummary: '',
        desiredSolution: '',
        preferences: '',
        additionalDetails: '',
        contact: '',
        email: ''
      })
      setStep(1)
      window.setTimeout(() => {
        setToastVisible(false)
      }, 5000)
    } catch (error) {
      setStatusType('error')
      setStatusMessage('Submission failed. Please try again. / सबमिशन विफल हुआ। कृपया पुनः प्रयास करें।')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 text-gray-900">
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <div className="text-base font-bold text-orange-600">आदि शक्ति</div>
              <div className="text-sm text-gray-600">विश्व कल्याण संस्थान</div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700">
            <button
              onClick={scrollToHome}
              className={`${currentPage === 'home' ? 'text-orange-600' : 'hover:text-orange-600'}`}
            >
              Home
            </button>
            <button
              onClick={scrollToAbout}
              className={`${currentPage === 'about' ? 'text-orange-600' : 'hover:text-orange-600'}`}
            >
              About Us
            </button>
            <button
              onClick={scrollToFAQs}
              className={`${currentPage === 'faq' ? 'text-orange-600' : 'hover:text-orange-600'}`}
            >
              FAQs
            </button>
            <button
              onClick={handleContactNav}
              className="rounded-full bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              Contact Us
            </button>
          </nav>
        </div>
      </header>

      {currentPage === 'home' ? (
        <>
          <section ref={topRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 to-yellow-200/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-6 shadow-sm">
                <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-full object-cover" />
                <span className="text-base font-semibold">आदि शक्ति विश्व कल्याण संस्थान</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                आदि शक्ति
                <span className="block text-orange-600">विश्व कल्याण संस्थान</span>
              </h1>
              <p className="mt-6 text-2xl font-semibold text-gray-800 max-w-3xl">
                समस्या का सही समाधान, भरोसा और मार्गदर्शन
              </p>

              <div className="mt-8 text-lg text-gray-700 leading-relaxed max-w-3xl space-y-4">
                <p>
                  आप किसी भी व्यक्तिगत, पारिवारिक, सामाजिक, आर्थिक, वैवाहिक, शैक्षणिक या /और अन्य समस्यायों से परेशान या पीड़ित हैं,
                  तो आप समुचित और पर्याप्त समाधान के लिए इस संस्थान से सम्पर्क कर सकते हैं।
                </p>
                <p>
                  इन समस्यायों में व्यक्तिगत दुश्मनी, खतरे, जमीनी या अन्य सम्पत्ति विवाद, या घरेलू विवाद भी शामिल हैं।
                </p>
                <p>
                  इनमे परिवार का आर्थिक संकट या कर्ज का बोझ से निजात पाने की जरुरत शामिल हैं। परिवार का आपसी विवाद का भी समाधान मिलेगा।
                </p>
                <p>
                  प्रेम में असफलता या वैवाहिक जीवन का कष्टप्रद रहने का भी समाधान उपलब्ध है।
                </p>
                <p>
                  पढ़ाई या रोजगार की असफलता, या नौकरी नहीं लगना, या नौकरी मिलते मिलते रह जाना हो सकता है। इन सभी के समुचित समाधान के लिए अवश्य संपर्क करें।
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={scrollToConsultation}
                  className="px-10 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 transition-all text-white font-semibold shadow-xl hover:scale-105"
                >
                  संपर्क करें / Contact Us
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-[36px] p-8 shadow-2xl border border-orange-100">
                <img
                  src="/founder.png"
                  alt="Founder"
                  className="w-full h-[500px] object-cover rounded-[28px]"
                />

                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-orange-100">
                  <div className="text-sm uppercase tracking-widest text-orange-600 font-bold">
                    संस्थापक
                  </div>
                  <div className="text-3xl font-black mt-1 text-center">
                    आचार्य प्रवर निरंजन जी
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-black">Testimonials</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            हमारे संतुष्ट ग्राहकों की कुछ प्रतिक्रियाएँ।
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[32px] border border-orange-100 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Age {item.age}</p>
                </div>
                <div className="text-orange-500 text-lg">
                  {Array.from({ length: item.rating }).map((_, starIndex) => (
                    <span key={starIndex}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">“{item.message}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black">
            हमारे उपाय
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: 'Religious & Spiritual Remedies',
              desc: 'Personalized mantras, pooja, yantra, advices and ritual-based remedies.',
              emoji: '🪔'
            },
            {
              title: 'Customized Charged Tantra',
              desc: 'Energized religious and spiritual tantra crafted for protection, prosperity, and positivity.',
              emoji: '🧿'
            }
          ].map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-3xl p-8 border border-orange-100 shadow-lg"
            >
              <div className="text-5xl mb-5">{service.emoji}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-[40px] overflow-hidden bg-gradient-to-r from-orange-700 to-yellow-600 p-8 lg:p-14 text-white shadow-2xl">
          <div className="grid lg:grid-cols-[0.95fr_1.4fr] gap-8 items-start">
            <div className="max-w-xl">
              <div className="rounded-[32px] border border-white/20 bg-white/10 p-8 shadow-inner">
                <h2 className="text-3xl lg:text-4xl font-black leading-tight">
                  Book Your Personalized Consultation Today
                </h2>
                <p className="mt-4 text-base lg:text-lg text-white/90 leading-relaxed">
                  सीधे यहाँ अपना फॉर्म भरें और हमें अपनी समस्या बताएं। हमारी टीम जल्द ही आपको संपर्क करेगी।
                </p>
              </div>
            </div>

            <div ref={consultationRef} className="bg-white rounded-3xl p-8 text-gray-900 shadow-xl">
              <div className="text-2xl font-black mb-6">Get in Touch</div>

              <div className="mb-6">
                <div className="flex items-center gap-4 overflow-x-auto pb-3">
                  {stepLabels.map((item) => {
                    const enabled = canGoToStep(item.id)
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleStepClick(item.id)}
                        disabled={!enabled}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          step === item.id
                            ? 'bg-orange-600 text-white shadow-lg'
                            : enabled
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {item.id}. {item.title}
                        <span className="block text-xs font-normal">{item.subtitle}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {statusMessage && (
                <div
                  className={`mb-4 rounded-2xl px-4 py-3 text-sm ${
                    statusType === 'success'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 relative">
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                        नाम / Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        required
                        placeholder="नाम दर्ज करें / Enter your name"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="mb-2 block text-sm font-semibold text-gray-700">
                        लिंग / Gender
                      </label>
                      <input
                        type="text"
                        name="gender"
                        id="gender"
                        value={formValues.gender}
                        onChange={handleInputChange}
                        placeholder="पुरुष, स्त्री, उभयलिंगी, ट्रांसजेंडर"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="mb-2 block text-sm font-semibold text-gray-700">
                        उम्र / Age
                      </label>
                      <input
                        type="text"
                        name="age"
                        id="age"
                        value={formValues.age}
                        onChange={handleInputChange}
                        placeholder="वर्षों में / In years"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="birthDetails" className="mb-2 block text-sm font-semibold text-gray-700">
                        जन्म तिथि, समय, स्थान / Birth date, time, place
                      </label>
                      <input
                        type="text"
                        name="birthDetails"
                        id="birthDetails"
                        value={formValues.birthDetails}
                        onChange={handleInputChange}
                        placeholder="दिनांक, समय, स्थान"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="mb-2 block text-sm font-semibold text-gray-700">
                        वर्तमान स्थान / Current location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formValues.location}
                        onChange={handleInputChange}
                        placeholder="शहर, राज्य, देश"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="problemSummary" className="mb-2 block text-sm font-semibold text-gray-700">
                        समस्यायों का संक्षिप्त विवरण / Brief description of the problem
                      </label>
                      <textarea
                        name="problemSummary"
                        id="problemSummary"
                        value={formValues.problemSummary}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        placeholder="अपनी समस्या का संक्षिप्त वर्णन करें"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="desiredSolution" className="mb-2 block text-sm font-semibold text-gray-700">
                        ऐच्छिक समाधान / Desired solution
                      </label>
                      <textarea
                        name="desiredSolution"
                        id="desiredSolution"
                        value={formValues.desiredSolution}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="आप चाहने वाला समाधान लिखें"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="additionalDetails" className="mb-2 block text-sm font-semibold text-gray-700">
                        अन्य कोई जानकारी / Other important information 
                      </label>
                      <textarea
                        name="additionalDetails"
                        id="additionalDetails"
                        value={formValues.additionalDetails}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="यदि कोई अन्य जानकारी है तो लिखें"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="contact" className="mb-2 block text-sm font-semibold text-gray-700">
                        संपर्क नम्बर / Contact number
                      </label>
                      <input
                        type="tel"
                        name="contact"
                        id="contact"
                        value={formValues.contact}
                        onChange={handleInputChange}
                        required
                        placeholder="अपना संपर्क नंबर दें"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                        ईमेल / Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="आपका ईमेल दर्ज करें"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-2">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                      className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      पिछला / Previous
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700"
                    >
                      अगला / Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300"
                    >
                      {isSubmitting ? 'भेजा जा रहा है...' : 'परामर्श भेजें / Request Consultation'}
                    </button>
                  )}
                </div>
              </form>

              {toastVisible && (
                <div
                  role="status"
                  aria-live="polite"
                  className="fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-3xl border border-emerald-200 bg-white p-4 shadow-2xl transition duration-300 ease-out"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-12 w-12 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">Submission Successful</div>
                      <div className="mt-1 text-sm text-gray-700">
                        Details have been sent. We will contact you soon. / आपकी जानकारी भेज दी गई है। हम जल्द ही आपसे संपर्क करेंगे।
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
        </>
      ) : currentPage === 'about' ? (
        <About />
      ) : (
        <FAQ />
      )}

      <footer className="border-t border-orange-200 bg-orange-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] items-center">
            <img src="/logo.png" alt="Logo" className="h-16 w-16 rounded-3xl border border-orange-200 bg-white p-2 object-cover" />
            <div className="text-gray-700 text-sm md:text-base">
              <div className="font-semibold text-gray-900">आदि शक्ति विश्व कल्याण संस्थान</div>
              <div>Address: 123 शांति मार्ग, वैदिक नगर, नई दिल्ली - 110001</div>
              <div>Phone: +91 98765 43210 | Email: contact@adishakti.org</div>
              <div>सम्पूर्ण समस्याओं के लिए परामर्श, उपाय और मार्गदर्शन उपलब्ध हैं।</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
