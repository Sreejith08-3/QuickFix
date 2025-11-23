// Multi-language support for QuickFix
import { Language } from '@/types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.how_it_works': 'How it Works',
    'nav.become_technician': 'Become a Technician',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.bookings': 'Bookings',
    'nav.forum': 'Community',
    'nav.logout': 'Logout',
    
    // Hero
    'hero.title': 'Get Your Home Fixed Fast',
    'hero.subtitle': 'Connect with verified technicians in minutes. AI-powered matching for the perfect repair specialist.',
    'hero.cta.primary': 'Book a Service',
    'hero.cta.secondary': 'Emergency Help',
    
    // Services
    'services.title': 'Our Services',
    'services.electrical': 'Electrical',
    'services.plumbing': 'Plumbing',
    'services.carpentry': 'Carpentry',
    'services.painting': 'Painting',
    'services.hvac': 'HVAC',
    'services.appliance': 'Appliance Repair',
    'services.locksmith': 'Locksmith',
    'services.cleaning': 'Cleaning',
    
    // Emergency
    'emergency.title': 'Emergency QuickFix',
    'emergency.description': 'Need urgent help? We\'ll connect you with the nearest available technician immediately.',
    'emergency.button': 'Get Emergency Help',
    
    // AI Features
    'ai.diagnostic.title': 'AI Diagnostic Tool',
    'ai.diagnostic.description': 'Upload photos or videos and let our AI diagnose the issue',
    'ai.diagnostic.upload': 'Upload Images/Videos',
    'ai.diagnostic.analyzing': 'Analyzing...',
    'ai.diagnostic.result': 'Diagnostic Result',
    
    // Common
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
  },
  ml: {
    // Malayalam translations
    'nav.home': 'ഹോം',
    'nav.services': 'സേവനങ്ങൾ',
    'nav.how_it_works': 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    'nav.become_technician': 'ടെക്നീഷ്യനാകുക',
    'nav.login': 'ലോഗിൻ',
    'nav.signup': 'സൈൻ അപ്പ്',
    'hero.title': 'നിങ്ങളുടെ വീട് വേഗത്തിൽ ശരിയാക്കുക',
    'hero.subtitle': 'മിനിറ്റുകൾക്കുള്ളിൽ സ്ഥിരീകരിച്ച ടെക്നീഷ്യന്മാരുമായി ബന്ധപ്പെടുക',
    'hero.cta.primary': 'സേവനം ബുക്ക് ചെയ്യുക',
    'hero.cta.secondary': 'അടിയന്തര സഹായം',
  },
  hi: {
    // Hindi translations
    'nav.home': 'होम',
    'nav.services': 'सेवाएं',
    'nav.how_it_works': 'यह कैसे काम करता है',
    'nav.become_technician': 'तकनीशियन बनें',
    'nav.login': 'लॉगिन',
    'nav.signup': 'साइन अप',
    'hero.title': 'अपने घर को जल्दी ठीक करें',
    'hero.subtitle': 'मिनटों में सत्यापित तकनीशियनों से जुड़ें',
    'hero.cta.primary': 'सेवा बुक करें',
    'hero.cta.secondary': 'आपातकालीन सहायता',
  },
  ta: {
    // Tamil translations
    'nav.home': 'முகப்பு',
    'nav.services': 'சேவைகள்',
    'nav.how_it_works': 'இது எவ்வாறு செயல்படுகிறது',
    'nav.become_technician': 'தொழில்நுட்ப வல்லுநராக மாறுங்கள்',
    'nav.login': 'உள்நுழைவு',
    'nav.signup': 'பதிவு செய்க',
    'hero.title': 'உங்கள் வீட்டை விரைவாக சரிசெய்யுங்கள்',
    'hero.subtitle': 'நிமிடங்களில் சரிபார்க்கப்பட்ட தொழில்நுட்ப வல்லுநர்களுடன் இணையுங்கள்',
    'hero.cta.primary': 'சேவையை முன்பதிவு செய்க',
    'hero.cta.secondary': 'அவசர உதவி',
  },
  te: {
    // Telugu translations
    'nav.home': 'హోమ్',
    'nav.services': 'సేవలు',
    'nav.how_it_works': 'ఇది ఎలా పనిచేస్తుంది',
    'nav.become_technician': 'టెక్నీషియన్ అవ్వండి',
    'nav.login': 'లాగిన్',
    'nav.signup': 'సైన్ అప్',
    'hero.title': 'మీ ఇంటిని త్వరగా సరిచేయండి',
    'hero.subtitle': 'నిమిషాల్లో ధృవీకరించిన టెక్నీషియన్లతో కనెక్ట్ అవ్వండి',
    'hero.cta.primary': 'సేవను బుక్ చేయండి',
    'hero.cta.secondary': 'అత్యవసర సహాయం',
  },
  kn: {
    // Kannada translations
    'nav.home': 'ಮುಖಪುಟ',
    'nav.services': 'ಸೇವೆಗಳು',
    'nav.how_it_works': 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    'nav.become_technician': 'ತಂತ್ರಜ್ಞನಾಗಿ',
    'nav.login': 'ಲಾಗಿನ್',
    'nav.signup': 'ಸೈನ್ ಅಪ್',
    'hero.title': 'ನಿಮ್ಮ ಮನೆಯನ್ನು ತ್ವರಿತವಾಗಿ ಸರಿಪಡಿಸಿ',
    'hero.subtitle': 'ನಿಮಿಷಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿದ ತಂತ್ರಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
    'hero.cta.primary': 'ಸೇವೆಯನ್ನು ಬುಕ್ ಮಾಡಿ',
    'hero.cta.secondary': 'ತುರ್ತು ಸಹಾಯ',
  },
};

export const useTranslation = (language: Language = 'en') => {
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return { t };
};
