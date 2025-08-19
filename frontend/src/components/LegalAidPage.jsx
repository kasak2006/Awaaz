import { useState } from "react";
import { FaShieldAlt, FaFileAlt, FaExclamationTriangle, FaPhoneAlt, FaUserEdit, FaHandsHelping, FaHeart } from "react-icons/fa";

function LegalAidCard({ icon, title, items, quickAction, onClick, expanded, accent }) {
  return (
    <div
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={onClick}
      onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className={`rounded-2xl border-2 p-6 bg-[#23171b] shadow-lg transition cursor-pointer flex flex-col items-start ${expanded ? "border-[#9E6263] bg-[#643E43]" : "border-[#C6A3B5] hover:border-[#9E6263] hover:bg-[#643E43]"}`}
      style={{ outline: expanded ? "3px solid #C6A3B5" : "none" }}
      aria-expanded={expanded}
      role="button"
    >
      {icon}
      <h3 className="font-bold text-[#C6A3B5] mb-2 mt-2 text-lg">{title}</h3>
      <ul className="text-[#C6A3B5] text-sm mb-3">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      {expanded && quickAction}
    </div>
  );
}

export default function LegalAidPage() {
  const [expanded, setExpanded] = useState(null);

  const cards = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-3xl text-[#9E6263]" />,
      title: "Understanding Your Rights",
      items: ["Right to safety and security", "Right to file complaints", "Protection under various laws", "Understanding consent laws"],
      quickAction: (
        <button className="px-4 py-2 mt-3 rounded-lg font-semibold bg-[#9E6263] text-white text-sm focus:outline-none">
          View Micro-lesson
        </button>
      )
    },
    {
      id: 2,
      icon: <FaFileAlt className="text-3xl text-[#9E6263]" />,
      title: "How to File an FIR",
      items: ["When to file an FIR", "Required documents and information", "Rights during the process", "What happens after filing"],
      quickAction: (
        <button className="px-4 py-2 mt-3 rounded-lg font-semibold bg-[#9E6263] text-white text-sm focus:outline-none">
          Start FIR Process
        </button>
      )
    },
    {
      id: 3,
      icon: <FaUserEdit className="text-3xl text-[#9E6263]" />,
      title: "Police Complaint Process",
      items: ["Preparing your complaint", "Documentation requirements", "Follow-up procedures", "Your rights with police"],
      quickAction: (
        <button className="px-4 py-2 mt-3 rounded-lg font-semibold bg-[#9E6263] text-white text-sm focus:outline-none">
          Lodge Complaint
        </button>
      )
    },
    {
      id: 4,
      icon: <FaPhoneAlt className="text-3xl text-[#9E6263]" />,
      title: "Emergency Contacts",
      items: ["National Helpline Numbers", "Women's Helpline Numbers", "Legal Aid Services", "Counseling Support"],
      quickAction: (
        <button className="px-4 py-2 mt-3 rounded-lg font-semibold bg-[#9E6263] text-white text-sm focus:outline-none">
          Call Helpline
        </button>
      )
    }
  ];

  // Emergency numbers clickable
  const emergencyNumbers = [
    { label: "Emergency: 112", number: "tel:112" },
    { label: "Women's Helpline: 1091", number: "tel:1091" },
    { label: "Legal Aid: 15100", number: "tel:15100" },
  ];

  return (
    <div className="min-h-screen bg-[#181516] py-8 px-4 md:px-12 font-sans">
      {/* Emergency Assistance Box */}
      <div className="rounded-2xl border-2 shadow-xl max-w-2xl mx-auto mb-8 bg-[#23171b] border-[#9E6263] relative animate-pulse">
        <div className="flex items-center gap-3 px-6 py-5">
          <FaExclamationTriangle className="text-4xl text-[#9E6263]" aria-label="Emergency Alert" />
          <div>
            <h2 className="text-xl font-bold text-[#C6A3B5]">Emergency Assistance</h2>
            <p className="text-[#C6A3B5] mt-2 text-sm">
              If you’re in immediate danger, contact emergency services immediately.
            </p>
            <div className="flex gap-3 mt-3 flex-wrap">
              {emergencyNumbers.map(item =>
                <a
                  key={item.label}
                  href={item.number}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-[#9E6263] shadow hover:bg-[#643E43] transition text-sm focus:outline-none"
                  aria-label={`Call ${item.label}`}
                >
                  {item.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        {cards.map(card => (
          <LegalAidCard
            key={card.id}
            {...card}
            expanded={expanded === card.id}
            onClick={() => setExpanded(expanded === card.id ? null : card.id)}
          />
        ))}
      </div>

      {/* Additional Support */}
      <div className="max-w-4xl mx-auto mt-6">
        <h3 className="font-bold text-[#C6A3B5] mb-4 text-lg">Additional Support</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <button className="px-6 py-4 rounded-xl bg-[#643E43] text-[#C6A3B5] font-semibold text-sm flex-1 focus:outline-none">
            <FaHandsHelping className="inline-block mr-2 text-[#9E6263]" /> Legal Aid Clinics
          </button>
          <button className="px-6 py-4 rounded-xl bg-[#643E43] text-[#C6A3B5] font-semibold text-sm flex-1 focus:outline-none">
            <FaHeart className="inline-block mr-2 text-[#9E6263]" /> Counseling Services
          </button>
          <button className="px-6 py-4 rounded-xl bg-[#643E43] text-[#C6A3B5] font-semibold text-sm flex-1 focus:outline-none">
            <FaUserEdit className="inline-block mr-2 text-[#9E6263]" /> Support Groups
          </button>
        </div>
      </div>

      {/* Accessibility & Personalization */}
      <div className="max-w-4xl mx-auto mt-10 p-6 rounded-xl bg-[#23171b] border border-[#C6A3B5]">
        <h4 className="text-lg text-[#C6A3B5] font-semibold mb-3">Need personalized help?</h4>
        <p className="text-[#C6A3B5] mb-2">Take a quick questionnaire so we can guide you to the right resources.</p>
        <button className="px-5 py-2 bg-[#9E6263] text-white font-semibold rounded-lg focus:outline-none">
          Start Questionnaire
        </button>
      </div>
    </div>
  );
}
