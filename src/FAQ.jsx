export default function FAQ() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="rounded-[36px] border border-orange-100 bg-white p-10 shadow-2xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black text-gray-900 mb-6">FAQs</h1>
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              नीचे कुछ सामान्य प्रश्न और उनके उत्तर दिए गए हैं। आप इन्हें अपनी सुविधानुसार बदल सकते हैं।
            </p>
            <div className="space-y-6">
              {[
                {
                  q: 'क्या यह सेवा व्यक्तिगत और पारिवारिक समस्याओं दोनों के लिए उपयोगी है?',
                  a: 'हाँ, हमारी टीम पारिवारिक विवाद, वैवाहिक समस्याएँ, आर्थिक संकट और व्यक्तिगत चुनौतियों के लिए उपाय प्रदान करती है।'
                },
                {
                  q: 'मुझे किस प्रकार की जानकारी पहले भेजनी होगी?',
                  a: 'आपका नाम, जन्म विवरण, वर्तमान स्थान, समस्या का संक्षिप्त विवरण और संपर्क जानकारी पर्याप्त होती है।'
                },
                {
                  q: 'क्या यह सेवा ऑनलाइन परामर्श देती है?',
                  a: 'हाँ, हम ऑनलाइन या कॉल के माध्यम से मार्गदर्शन प्रदान कर सकते हैं, और आवश्यकतानुसार व्यक्तिगत सलाह देते हैं।'
                },
                {
                  q: 'क्या समाधान तुरंत मिल जाएगा?',
                  a: 'समाधान की प्रकृति समस्या पर निर्भर करती है। हम समस्या के आधार पर उपयुक्त उपाय सुझाते हैं।'
                }
              ].map((item) => (
                <div key={item.q} className="rounded-3xl border border-orange-100 bg-orange-50 p-8 shadow-inner">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">{item.q}</h2>
                  <p className="text-gray-700 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
