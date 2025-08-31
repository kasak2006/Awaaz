import { 
  FaShieldAlt, FaFileAlt, FaExclamationTriangle, FaPhoneAlt, 
  FaUserEdit, FaHandsHelping, FaHeart, FaHome, FaUser, FaArrowLeft 
} from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Static Info Pages Component
function InfoPage({ type, onBack }) {
  const getPageContent = () => {
    switch (type) {
      case 'rights':
        return {
          title: "Understanding Your Rights",
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-[#C6A3B5] mb-3">Your Fundamental Rights</h3>
                <div className="space-y-4 text-[#C6A3B5]/90">
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Right to Safety and Security</h4>
                    <p>Every individual has the right to live without fear of violence or harassment. This includes protection from physical, emotional, and sexual abuse.</p>
                  </div>
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Right to File Complaints</h4>
                    <p>You have the right to file complaints with police authorities without discrimination. Police are legally bound to register your complaint.</p>
                  </div>
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Protection Under Law</h4>
                    <p>Various laws protect you including the Indian Penal Code, Protection of Women from Domestic Violence Act, and Sexual Harassment laws.</p>
                  </div>
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Understanding Consent</h4>
                    <p>Consent must be freely given, ongoing, and can be withdrawn at any time. No means no, regardless of circumstances.</p>
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-xl font-semibold text-[#C6A3B5] mb-3">Key Legal Protections</h3>
                <ul className="space-y-2 text-[#C6A3B5]/90">
                  <li>• Right to privacy and dignity</li>
                  <li>• Right to legal representation</li>
                  <li>• Right to be heard in court</li>
                  <li>• Right to compensation for damages</li>
                  <li>• Right to protection from retaliation</li>
                </ul>
              </section>
            </div>
          )
        };
      
      case 'fir':
        return {
          title: "How to File an FIR",
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-[#C6A3B5] mb-3">Step-by-Step FIR Process</h3>
                <div className="space-y-4">
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <div className="flex items-center mb-2">
                      <span className="bg-[#9E6263] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                      <h4 className="font-semibold text-[#C6A3B5]">When to File an FIR</h4>
                    </div>
                    <p className="text-[#C6A3B5]/90">File an FIR immediately after any cognizable offense like theft, assault, harassment, or any crime you've witnessed or experienced.</p>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <div className="flex items-center mb-2">
                      <span className="bg-[#9E6263] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                      <h4 className="font-semibold text-[#C6A3B5]">Required Information</h4>
                    </div>
                    <ul className="text-[#C6A3B5]/90 space-y-1">
                      <li>• Date, time, and place of incident</li>
                      <li>• Details of what happened</li>
                      <li>• Names and addresses of accused (if known)</li>
                      <li>• Names of witnesses</li>
                      <li>• Any evidence or documents</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <div className="flex items-center mb-2">
                      <span className="bg-[#9E6263] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                      <h4 className="font-semibold text-[#C6A3B5]">Your Rights During Filing</h4>
                    </div>
                    <ul className="text-[#C6A3B5]/90 space-y-1">
                      <li>• Police cannot refuse to register FIR</li>
                      <li>• You have right to get free copy of FIR</li>
                      <li>• You can file in any police station</li>
                      <li>• You can file in your preferred language</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <div className="flex items-center mb-2">
                      <span className="bg-[#9E6263] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</span>
                      <h4 className="font-semibold text-[#C6A3B5]">After Filing</h4>
                    </div>
                    <p className="text-[#C6A3B5]/90">Investigation begins immediately. You'll receive updates on case progress. Cooperate with police while knowing your rights.</p>
                  </div>
                </div>
              </section>
            </div>
          )
        };
      
      case 'complaint':
        return {
          title: "Police Complaint Process",
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-[#C6A3B5] mb-3">Filing a Police Complaint</h3>
                <div className="space-y-4">
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Preparing Your Complaint</h4>
                    <ul className="text-[#C6A3B5]/90 space-y-1">
                      <li>• Write down all facts clearly and chronologically</li>
                      <li>• Include dates, times, and locations</li>
                      <li>• Gather all relevant evidence</li>
                      <li>• List potential witnesses</li>
                      <li>• Keep copies of all documents</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Required Documentation</h4>
                    <ul className="text-[#C6A3B5]/90 space-y-1">
                      <li>• Identity proof (Aadhar, PAN, etc.)</li>
                      <li>• Address proof</li>
                      <li>• Evidence of the incident (photos, videos, messages)</li>
                      <li>• Medical reports (if applicable)</li>
                      <li>• Previous complaints (if any)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Follow-up Procedures</h4>
                    <ul className="text-[#C6A3B5]/90 space-y-1">
                      <li>• Get acknowledgment receipt</li>
                      <li>• Note down complaint number</li>
                      <li>• Regular follow-up with investigating officer</li>
                      <li>• Provide additional information if requested</li>
                      <li>• Keep track of case status</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Your Rights with Police</h4>
                    <ul className="text-[#C6A3B5]/90 space-y-1">
                      <li>• Right to be treated with respect and dignity</li>
                      <li>• Right to information about case progress</li>
                      <li>• Right to legal assistance</li>
                      <li>• Right to complain against police misconduct</li>
                      <li>• Right to approach higher authorities if unsatisfied</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )
        };
      
      case 'emergency':
        return {
          title: "Emergency Contacts & Helplines",
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-[#C6A3B5] mb-3">National Emergency Numbers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Emergency Services</h4>
                    <div className="space-y-2 text-[#C6A3B5]/90">
                      <p><strong>Police:</strong> 100</p>
                      <p><strong>Fire:</strong> 101</p>
                      <p><strong>Ambulance:</strong> 108</p>
                      <p><strong>Emergency:</strong> 112</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Women's Helplines</h4>
                    <div className="space-y-2 text-[#C6A3B5]/90">
                      <p><strong>Women Helpline:</strong> 1091</p>
                      <p><strong>Women in Distress:</strong> 181</p>
                      <p><strong>Domestic Violence:</strong> 181</p>
                      <p><strong>Cyber Crime:</strong> 1930</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Legal Aid Services</h4>
                    <div className="space-y-2 text-[#C6A3B5]/90">
                      <p><strong>Legal Aid:</strong> 15100</p>
                      <p><strong>Human Rights:</strong> 1095</p>
                      <p><strong>Consumer Helpline:</strong> 1915</p>
                      <p><strong>Senior Citizen:</strong> 14567</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                    <h4 className="font-semibold text-[#9E6263] mb-2">Counseling Support</h4>
                    <div className="space-y-2 text-[#C6A3B5]/90">
                      <p><strong>Mental Health:</strong> 14416</p>
                      <p><strong>Suicide Prevention:</strong> 91529 87821</p>
                      <p><strong>Child Helpline:</strong> 1098</p>
                      <p><strong>Elder Abuse:</strong> 14567</p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-[#C6A3B5] mb-3">When to Call</h3>
                <div className="bg-[#23171b] p-4 rounded-lg border border-[#643E43]/30">
                  <ul className="text-[#C6A3B5]/90 space-y-2">
                    <li>• <strong>Immediate danger:</strong> Call 112 or 100 immediately</li>
                    <li>• <strong>Domestic violence:</strong> Call 181 for immediate help</li>
                    <li>• <strong>Sexual harassment:</strong> Call 1091 for women's helpline</li>
                    <li>• <strong>Emotional distress:</strong> Call mental health helplines</li>
                    <li>• <strong>Legal guidance:</strong> Call 15100 for free legal aid</li>
                  </ul>
                </div>
              </section>
            </div>
          )
        };
      
      default:
        return {
          title: "Information Page",
          content: <p className="text-[#C6A3B5]">Information not available.</p>
        };
    }
  };

  const { title, content } = getPageContent();

  return (
    <div className="min-h-screen bg-[#181516] flex">
      {/* Sidebar */}
      <aside className="sticky top-0 w-64 h-screen bg-[#23171b] flex flex-col justify-between px-4 border-r border-[#643E43]">
        <div>
          <h2 className="text-2xl font-bold text-[#C6A3B5] mb-8 tracking-wider">Awaaz</h2>
          <nav className="flex flex-col gap-2">
            <SidebarItem text="Home" Icon={FaHome} to="/dashboard" />
            <SidebarItem text="Legal Aid" Icon={FaShieldAlt} active />
            <SidebarItem text="Profile" Icon={FaUser} to="/profile" />
          </nav>
        </div>        
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#181516] px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-[#9E6263] text-white rounded-lg hover:bg-[#C6A3B5] transition-colors duration-200"
            >
              <FaArrowLeft />
              Back to Legal Aid
            </button>
            <h1 className="text-3xl font-bold text-[#C6A3B5]">{title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          {content}
        </div>
      </main>
    </div>
  );
}

// Card Component
function LegalAidCard({ icon, title, items, quickAction, onClick, expanded, onButtonClick }) {
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-expanded={expanded}
      className={`rounded-2xl border-2 p-6 bg-[#23171b] shadow-lg cursor-pointer
      transition flex flex-col items-start w-full hover:scale-[1.02] duration-200
      ${expanded ? "border-[#9E6263] bg-[#643E43]" : "border-[#C6A3B5]"}`}
    >
      <div className="text-3xl text-[#9E6263]">{icon}</div>
      <h3 className="font-bold text-[#C6A3B5] mb-2 mt-2 text-lg">{title}</h3>
      <ul className="text-[#C6A3B5] text-sm space-y-1">
        {items.map((item, i) => <li key={i}>• {item}</li>)}
      </ul>
      {expanded && (
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={onButtonClick}
            className="px-4 py-2 rounded-lg font-semibold bg-[#9E6263] text-white text-sm hover:bg-[#C6A3B5] transition-colors duration-200"
          >
            {quickAction}
          </button>
        </div>
      )}
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ text, Icon, active, to }) {
  const content = (
    <div
      className={`flex items-center px-4 py-3 rounded-lg transition font-semibold text-lg 
        ${active ? "bg-[#9E6263] text-white" : "text-[#C6A3B5] opacity-90 hover:bg-[#643E43] hover:text-white"}`}
    >
      <Icon className="mr-3 text-xl" />
      {text}
    </div>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }
  return content;
}

// Main Page
export default function LegalAidPage() {
  const [expanded, setExpanded] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const cards = [
    {
      id: 1,
      icon: <FaShieldAlt />,
      title: "Understanding Your Rights",
      items: [
        "Right to safety and security",
        "Right to file complaints",
        "Protection under various laws",
        "Understanding consent laws"
      ],
      quickAction: "View Micro-lesson",
      pageType: "rights"
    },
    {
      id: 2,
      icon: <FaFileAlt />,
      title: "How to File an FIR",
      items: [
        "When to file an FIR",
        "Required documents and information",
        "Rights during the process",
        "What happens after filing"
      ],
      quickAction: "Start FIR Process",
      pageType: "fir"
    },
    {
      id: 3,
      icon: <FaUserEdit />,
      title: "Police Complaint Process",
      items: [
        "Preparing your complaint",
        "Documentation requirements",
        "Follow-up procedures",
        "Your rights with police"
      ],
      quickAction: "Lodge Complaint",
      pageType: "complaint"
    },
    {
      id: 4,
      icon: <FaPhoneAlt />,
      title: "Emergency Contacts",
      items: [
        "National Helpline Numbers",
        "Women's Helpline Numbers",
        "Legal Aid Services",
        "Counseling Support"
      ],
      quickAction: "Call Helpline",
      pageType: "emergency"
    }
  ];

  const emergencyNumbers = [
    { label: "Emergency: 112", number: "tel:112" },
    { label: "Women's Helpline: 1091", number: "tel:1091" },
    { label: "Legal Aid: 15100", number: "tel:15100" },
  ];

  // Show info page if currentPage is set
  if (currentPage) {
    return <InfoPage type={currentPage} onBack={() => setCurrentPage(null)} />;
  }

  return (
    <div className="min-h-screen flex bg-[#181516] font-sans">
      {/* Sidebar */}
      <aside className="sticky top-0 w-64 h-screen bg-[#23171b] flex flex-col justify-between px-4 border-r border-[#643E43]">
        <div>
          <h2 className="text-2xl font-bold text-[#C6A3B5] mb-8 tracking-wider">Awaaz</h2>
          <nav className="flex flex-col gap-2">
            <SidebarItem text="Home" Icon={FaHome} to="/dashboard" />
            <SidebarItem text="Legal Aid" Icon={FaShieldAlt} active />
            <SidebarItem text="Profile" Icon={FaUser} to="/profile" />
          </nav>
        </div>        
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#181516] px-8 py-10">
        
        {/* Emergency Assistance */}
        <div className="rounded-2xl border-2 shadow-xl bg-[#23171b] border-[#9E6263] mb-8 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <FaExclamationTriangle className="text-4xl text-[#9E6263]" />
            <div>
              <h2 className="text-xl font-bold text-[#C6A3B5]">Emergency Assistance</h2>
              <p className="text-sm text-[#C6A3B5] mt-1">If you're in immediate danger, contact emergency services immediately.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {emergencyNumbers.map(n => (
                  <a key={n.label} href={n.number}
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-[#9E6263] hover:bg-[#643E43] text-sm"
                    aria-label={`Call ${n.label}`}>
                    {n.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(card => (
            <LegalAidCard
              key={card.id}
              {...card}
              expanded={expanded === card.id}
              onClick={() => setExpanded(expanded === card.id ? null : card.id)}
              onButtonClick={() => setCurrentPage(card.pageType)}
            />
          ))}
        </div>

        {/* Additional Support */}
        <div className="mt-8">
          <h3 className="font-bold text-lg text-[#C6A3B5] mb-4">Additional Support</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <button className="px-6 py-4 rounded-xl bg-[#643E43] text-[#C6A3B5] font-semibold text-sm flex-1">
              <FaHandsHelping className="inline mr-2 text-[#9E6263]" /> Legal Aid Clinics
            </button>
            <button className="px-6 py-4 rounded-xl bg-[#643E43] text-[#C6A3B5] font-semibold text-sm flex-1">
              <FaHeart className="inline mr-2 text-[#9E6263]" /> Counseling Services
            </button>
            <button className="px-6 py-4 rounded-xl bg-[#643E43] text-[#C6A3B5] font-semibold text-sm flex-1">
              <FaUserEdit className="inline mr-2 text-[#9E6263]" /> Support Groups
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}