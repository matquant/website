import { ArrowRight } from 'lucide-react';

export const AnnouncementBanner = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[110] h-[40px] bg-primary flex items-center justify-center px-4 shadow-md">
      <div className="flex items-center gap-3 md:gap-6 text-black font-bold text-xs md:text-sm">
        <span className="truncate">Applications are open! Deadline is 11/15.</span>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSfWXQSW0IQnvv18RbIe1GWnwhVJx3xix5KUrA34Brrcw4-W5g/viewform?usp=mail_form_link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-black text-primary px-3 py-1 rounded-full text-xs hover:bg-gray-900 transition-colors whitespace-nowrap"
        >
          Apply Now <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
};
