export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="rounded-[36px] border border-orange-100 bg-white p-10 shadow-2xl">
          <div className="space-y-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-24 w-24 rounded-3xl border border-orange-200 bg-orange-50 p-3 object-cover"
              />
              <div>
                <div className="text-base font-semibold text-orange-600 mb-2">आदि शक्ति विश्व कल्याण संस्थान</div>
                <h1 className="text-5xl font-black text-gray-900 mb-4">About Us</h1>
                <p className="text-lg leading-relaxed text-gray-700">
                  आदि शक्ति विश्व कल्याण संस्थान जीवन की चुनौतियों में आपका साथ देता है। हम
                  व्यक्तिगत, पारिवारिक और सामाजिक समस्याओं के लिए ठोस, भरोसेमंद तथा शांति-उन्मुख उपाय
                  प्रदान करते हैं।
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-orange-100 bg-orange-50 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">हमारा उद्देश्य</h2>
                <p className="text-gray-700 leading-relaxed">
                  जीवन की समस्याओं का स्थायी समाधान, आत्मिक शक्ति और विश्वास प्रदान करना।
                </p>
              </div>
              <div className="rounded-[28px] border border-orange-100 bg-orange-50 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">हमारी प्रक्रिया</h2>
                <p className="text-gray-700 leading-relaxed">
                  आपकी जानकारी के आधार पर हम विश्लेषण करते हैं और आपकी समस्या के अनुसार
                  व्यक्तिगत मार्गदर्शन तैयार करते हैं।
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                यह संस्थान व्यक्तिगत समस्याओं को समझकर उन तक उपयुक्त समाधान पहुंचाने में विश्वास
                रखता है। हम वैवाहिक, पारिवारिक, आर्थिक, शिक्षा व करियर, स्वास्थ्य व सुरक्षा से जुड़ी
                चुनौतियों के लिए मार्गदर्शन देते हैं।
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                हमारी प्रक्रिया निजी विचार-विमर्श, जन्म विवरण एवं समस्या विश्लेषण पर आधारित होती है।
                हम मंत्र, पूजा, यंत्र, तांत्रिक उपाय और आध्यात्मिक सलाह के संयोजन से जीवन में सकारात्मक
                बदलाव लाते हैं।
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                हमारी टीम गोपनीयता, अनुभव और सहानुभूति के साथ आपकी सहायता करती है। हमारा लक्ष्य
                आपके जीवन में शांति, समृद्धि और आत्म-विश्वास लाना है।
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
