import { useContent } from '../context/ContentContext';
import { Trophy, Footprints, Flame } from 'lucide-react';

export function StepsLeaderboard() {
  const { leaderboard } = useContent();

  // Urutkan dari yang terbesar ke terkecil
  const sortedData = [...leaderboard].sort((a, b) => b.steps - a.steps);
  // Ambil Top 5 saja untuk ditampilkan di Home
  const topRankings = sortedData.slice(0, 5);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-3 block">
            COMMUNITY CHALLENGE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Weekly Steps Champions
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Our clients are crushing their goals! Here are the top movers this week.
            Join the program to get on the board.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
            {/* Header Table */}
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 bg-white/5 text-sm font-bold text-white/50 uppercase tracking-wider">
              <div className="col-span-2 text-center">Rank</div>
              <div className="col-span-6">Athlete</div>
              <div className="col-span-4 text-right">Steps</div>
            </div>

            {/* List Body */}
            <div className="divide-y divide-white/5">
              {topRankings.length === 0 ? (
                <div className="p-12 text-center text-white/40">
                  No leaderboard data yet. Add entries from admin panel!
                </div>
              ) : (
                topRankings.map((item, index) => {
                  let rankIcon;
                  let rankClass = "text-white font-bold text-xl";
                  let rowBg = "hover:bg-white/5 transition-colors";

                  if (index === 0) {
                    rankIcon = <Trophy className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />;
                    rankClass = "text-yellow-400 font-bold text-2xl";
                    rowBg = "bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors";
                  } else if (index === 1) {
                    rankIcon = <Trophy className="w-5 h-5 text-slate-300" />;
                    rankClass = "text-slate-300 font-bold text-xl";
                  } else if (index === 2) {
                    rankIcon = <Trophy className="w-5 h-5 text-orange-700" />;
                    rankClass = "text-orange-700 font-bold text-xl";
                  } else {
                    rankIcon = <span className="text-white/30 font-mono">#{index + 1}</span>;
                  }

                  return (
                    <div key={item.id} className={`grid grid-cols-12 gap-4 p-6 items-center ${rowBg}`}>
                      {/* Rank Column */}
                      <div className="col-span-2 flex justify-center items-center">
                        {rankIcon}
                      </div>

                      {/* Name Column */}
                      <div className="col-span-6 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-bold border-2 ${index === 0 ? 'border-yellow-500' : 'border-white/10'
                          }`}>
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center ${index === 0 ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-white/70'
                              }`}>
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className={`font-medium text-lg ${index === 0 ? 'text-white' : 'text-white/80'}`}>
                          {item.name}
                        </span>
                        {index === 0 && <Flame className="w-4 h-4 text-orange-500 animate-pulse" />}
                      </div>

                      {/* Steps Column */}
                      <div className="col-span-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-orange-500 font-bold text-xl font-mono">
                          <Footprints className="w-4 h-4 opacity-50" />
                          {item.steps.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/5 text-center border-t border-white/5">
              <p className="text-white/40 text-sm">Last updated: Every Sunday Night</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}