import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import x from "../assets/X-icon.svg";
import linkedIn from "../assets/LinkedIn.svg";

const Footer = () => {
  const items = [
    {
      h2: "services",
      li: [
        "Primary Care",
        "Maternal Health Care",
        "Specialized Consultation",
        "Laboratory Tests",
        "Diagnostic Imaging",
        "TeleHealth Services",
        "Mental Health and Counselling",
      ],
    },
    {
      h2: "contact us",
      li: [
        "Mobile: +234 704 839 1801",
        "Inquiries: Info@avitahealth.ng",
        "Feedback : feedback@avitahealth.ng",
        "Location : 16, Anipole crescent Gbagada phase 1",
        "Thank you for choosing us",
      ],
    },
    {
      h2: "news",
      li: ["Avita today", "Health Library", "Press Realeases"],
    },
  ];

  return (
    <div id="contact" className="max-w-full">
      <div className="blue flex flex-col">
        <div className="p-0">
          <div className="flex justify-center items-center p-8 border-b-2 border-white w-4/5 mx-auto">
            <a href="/">
              <img
                className="footer-icons mx-4 hover:scale-150 transition-all max-w-full"
                src={facebook.src}
                alt="facebook icon"
              />
            </a>
            <a href="https://www.instagram.com/avitahealth24_7?igsh=MXFrcGo1cDQ1amcyYQ==">
              <img
                className="footer-icons mx-4 hover:scale-150 transition-all max-w-full"
                src={instagram.src}
                alt="instagram icon"
              />
            </a>
            <a href="https://x.com/Avitahealth24_7?t=2eUjOePd63RjNdLtWglKcw&s=08">
              <img
                className="footer-icons mx-4 hover:scale-150 transition-all max-w-full"
                src={x.src}
                alt="twitter icon"
              />
            </a>
            <a href="https://www.linkedin.com/company/avita-health-ltd-carego-24-7/">
              <img
                className="footer-icons mx-4 hover:scale-150 transition-all max-w-full"
                src={linkedIn.src}
                alt="LinkedIn icon"
              />
            </a>
          </div>

          <div className="footer mb-8">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center text-white"
              >
                <h2 className="footer-h2">{item.h2}</h2>
                <ul className="footer-ul pl-0">
                  {item.li.map((link, index) => (
                    <li className="mb-1.5 pl-0" key={index}>
                      {link.includes("@") ? (
                        <a
                          href={`mailto:${link.substring(
                            link.indexOf(":") + 1
                          )}`}
                        >
                          {link}
                        </a>
                      ) : link.includes("0") ? (
                        <a
                          href={`tel:${link.substring(link.indexOf(":") + 1)}`}
                        >
                          {link}
                        </a>
                      ) : (
                        <p className="hover:text-blue-200">{link}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-6 pb-3 text-sm">
        <p>&copy; 2024 Avita Health System. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
