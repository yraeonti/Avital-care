import Collapsible from "./Collapsible";

const Faq = () => {
  const items1 = [
    {
      heading: "What Services does Avita Health offer?",
      paragraph:
        "Avita Health provides a comprehensive range of healthcare services, including primary care, specialized consultations, diagnostic imaging, telehealth services, maternity and women's health, mental health, and more. Explore our Services page for detailed information",
    },
    {
      heading: "How can I book an appointment?",
      paragraph:
        "You can easily book an appointment through our online Appointment Booking System. Select your preferred date and time, and our system will guide you through the process. If you need assistance, you can also contact our customer support.",
    },
    {
      heading: "Can I access my medical records and test results online?",
      paragraph:
        "Yes, our secure Patient Portal allows you to access your medical records, test results, and other health information. If you have any questions about using the portal, please refer to our Patient Portal Guide.",
    },
    {
      heading: "How do I register for an account on the Patient Portal?",
      paragraph:
        "To register for a Patient Portal account, visit our Registration Page(sign up link). Follow the registration steps, and once your account is created, you'll have secure access to your health information.",
    },
  ];

  const items2 = [
    {
      heading: "What safeguards protect my data security?",
      paragraph:
        "Avita Health prioritizes the security and privacy of your data. Our Patient Portal uses strong authentication methods, data encryption, and complies with healthcare regulations.",
    },
    {
      heading: "How can I reach Avita Health's customer support?",
      paragraph:
        "For general inquiries, appointment scheduling, or assistance, you can reach our customer support team by phone at [coming soon] or via email at [Info@avitahealth.ng]. Visit our Contact Us page for more details.",
    },
    {
      heading: "Is Avita Health available for telehealth appointments?",
      paragraph:
        "Yes, Avita Health offers telehealth services, allowing you to consult with healthcare professionals remotely. Book a telehealth appointment through our Appointment Booking System.",
    },
    {
      heading: "Can I provide feedback or suggestions?",
      paragraph:
        "Absolutely! We value your feedback. You can share your thoughts or suggestions by emailing us at feedback@avitahealth.ng",
    },
  ];

  return (
    <div id="faq" className="p-4 text-center">
      <h4 className="text-base md:text-lg lg:text-2xl">Got a question?</h4>
      <h1
        style={{ color: "#004680" }}
        className="font-bold text-2xl md:text-3xl lg:text-5xl"
      >
        Frequently Asked Questions{" "}
      </h1>

      <div className="collapsible-grid mt-8">
        {/* first section of questions */}
        <div className="flex flex-col items-center">
          {items1.map((item, index) => (
            <Collapsible
              key={index}
              heading={item.heading}
              content={item.paragraph}
            />
          ))}
        </div>

        {/* second section of questions */}
        <div className="flex flex-col items-center">
          {items2.map((item, index) => (
            <Collapsible
              key={index}
              heading={item.heading}
              content={item.paragraph}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
