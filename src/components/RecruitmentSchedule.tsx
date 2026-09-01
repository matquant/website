import { Calendar, MapPin, Clock } from 'lucide-react';

export const RecruitmentSchedule = () => {
  const events = [
    {
      date: 'Sep 08',
      title: 'Mass Meeting',
      time: '6:00 - 7:00 PM',
      location: "Michigan League - 2nd Floor ('Michigan' Room)",
    },
    {
      date: 'Sep 15',
      title: 'Application Deadline',
      time: '11:59 PM',
      location: 'Apply on matquant.io',
    }
  ];

  return (
    <div className="w-full border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-[1200px] mx-auto px-6 py-6 md:py-8">
        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-8 justify-between">
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-tight uppercase text-sm md:text-base">Upcoming Events</h3>
              <p className="text-muted text-xs font-mono">Recruitment 2026</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 xl:gap-16 w-full xl:w-auto">
            {events.map((event, index) => (
              <div key={index} className="flex items-center gap-5 group md:border-l md:border-white/10 md:pl-8 xl:first:border-0 xl:first:pl-0">
                <div className="text-2xl md:text-3xl font-bold text-primary opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {event.date}
                </div>
                <div className="space-y-1.5 py-1">
                  <div className="text-sm font-bold text-white uppercase tracking-wider">{event.title}</div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-mono">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Clock size={12} className="text-primary/70" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <MapPin size={12} className="text-primary/70" /> {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
