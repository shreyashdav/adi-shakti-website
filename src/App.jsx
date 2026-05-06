import { useRef } from 'react'

export default function AdiShaktiWebsite() {
  const consultationRef = useRef(null)
  const remediesRef = useRef(null)

  const scrollToConsultation = () => {
    consultationRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToRemedies = () => {
    remediesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 text-gray-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 to-yellow-200/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-6 shadow-sm">
                Trusted Spiritual Guidance & Vedic Solutions
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                Adi Shakti
                <span className="block text-orange-600">Vishwa Kalyan</span>
                <span className="block">Kendra</span>
              </h1>

              <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-xl">
                Personalized Jyotish consultations, energized taveej, spiritual remedies,
                vastu guidance, and Vedic solutions to help bring peace, prosperity,
                positivity, and protection into your life.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={scrollToConsultation}
                  className="px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 transition-all text-white font-semibold shadow-xl hover:scale-105"
                >
                  Book Consultation
                </button>

                <button
                  onClick={scrollToRemedies}
                  className="px-8 py-4 rounded-2xl border border-orange-300 bg-white hover:bg-orange-50 transition-all font-semibold hover:scale-105"
                >
                  Explore Remedies
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-[36px] p-8 shadow-2xl border border-orange-100">
                <img
                  src="https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?q=80&w=1200&auto=format&fit=crop"
                  alt="Spiritual Guru"
                  className="w-full h-[500px] object-cover rounded-[28px]"
                />

                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-orange-100">
                  <div className="text-sm uppercase tracking-widest text-orange-600 font-bold">
                    Founder
                  </div>
                  <div className="text-3xl font-black mt-1">
                    Acharya Sri Niranjan Ji
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={remediesRef} className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black">
            Customized Vedic Solutions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Customized Taveej',
              desc: 'Energized spiritual taveej crafted for protection, prosperity, and positivity.',
              emoji: '🧿'
            },
            {
              title: 'Kundli Analysis',
              desc: 'Detailed horoscope reading for career, marriage, health, and finances.',
              emoji: '🔯'
            },
            {
              title: 'Vastu Guidance',
              desc: 'Balance home and workplace energies with traditional vastu consultation.',
              emoji: '🏡'
            },
            {
              title: 'Spiritual Remedies',
              desc: 'Personalized mantras, pooja, yantra, and ritual-based remedies.',
              emoji: '🪔'
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

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-[40px] overflow-hidden bg-gradient-to-r from-orange-700 to-yellow-600 p-10 lg:p-16 text-white shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                Book Your Personalized Consultation Today
              </h2>
            </div>

            <div ref={consultationRef} className="bg-white rounded-3xl p-8 text-gray-900 shadow-xl">
              <div className="text-2xl font-black mb-6">Get in Touch</div>

              <form
                action="https://formsubmit.co/shreyash.davkhag@gmail.com"
                method="POST"
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200"
                />

                <textarea
                  name="concern"
                  placeholder="Describe your concern"
                  rows={4}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200"
                ></textarea>

                <input type="hidden" name="_captcha" value="false" />

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-orange-600 text-white font-bold text-lg"
                >
                  Request Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
