import youth from '@/assets/images/youth.jpg';
import sports from '@/assets/images/sports.jpg';
import biswaBangla from '@/assets/images/biswa-bangla.png';
import defaultBanner from '@/assets/images/home-page-banner.jpg';
import nationalEmblem from '@/assets/images/national-emblem.png';
import nicLogo from '@/assets/images/NIC_logo.png';
import wbSignInBg from '@/assets/images/services/signin-bg.jpg';
import wbSignInFormBg from '@/assets/images/services/signin-form-bg.jpg';
import sportsLogo from '@/assets/images/sports-logo.png';
import profileImg from '@/assets/images/000m.jpg';
import computerTraining from '@/assets/images/services/computerTraining.jpg';
import hostel from '@/assets/images/services/hostel.jpg';
import scienceFair from '@/assets/images/services/science-fair.jpg';
import footerBg from '@/assets/images/services/footer_top_bg.gif';
import pdfIcon from '@/assets/images/pdf.png';

export const images = {
  youth,
  sports,
  biswaBangla,
  defaultBanner,
  nationalEmblem,
  nicLogo,
  wbSignInBg,
  wbSignInFormBg,
  sportsLogo,
  profileImg,
  computerTraining,
  hostel,
  scienceFair,
  footerBg,
  pdfIcon,
};

export const titles = {
  services: import.meta.env.VITE_SERVICE_APP_NAME,
  sports: import.meta.env.VITE_SPORTS_APP_NAME,
  servicesUrl: `${import.meta.env.VITE_SERVICES}/cms`,
  sportsUrl: `${import.meta.env.VITE_SPORTS}/cms`,
  serviceUrlWeb: import.meta.env.VITE_SERVICES,
  sportsUrlWeb: import.meta.env.VITE_SPORTS,
  serviceToken: import.meta.env.VITE_SERVICE_TOKEN,
  sportsToken: import.meta.env.VITE_SPORTS_TOKEN,
  servicesShort: import.meta.env.VITE_SERVICE_APP_NAME_SHORT,
  sportsShort: import.meta.env.VITE_SPORTS_APP_NAME_SHORT,
  baseUrl: import.meta.env.VITE_BASE_URL,
  websiteBaseUrl: import.meta.env.VITE_WEBSITE_BASE_URL,
};

export const compCourseTypes = [
  { label: 'Certificate', value: 'certificate' },
  { label: 'Diploma', value: 'diploma' },
  { label: 'Advanced Diploma', value: 'advanced diploma' },
];

export const compCourseDuration = [
  { label: '6 months', value: '6 months' },
  { label: '1 year', value: '1 year' },
  { label: '1 year 6 months', value: '1 year 6 months' },
];

export const compCentreCategory = [
  { label: 'Municipal Corporation Area', value: 'municipal corporation area' },
  { label: 'Municipality Area', value: 'municipality area' },
  { label: 'Panchayat Area', value: 'panchayat area' },
];

export const fairTypes = [
  { label: 'One-time', value: 'one-time' },
  { label: 'Recurring', value: 'recurring' },
];
