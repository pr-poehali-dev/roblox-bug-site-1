import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const games = [
  { id: 'rivas', name: 'RIVAS', icon: 'Zap', color: 'from-cyan-500 to-blue-500', bugs: 3 },
  { id: 'grow-garden', name: 'GROW A GARDEN', icon: 'Flower2', color: 'from-green-500 to-emerald-500', bugs: 3 },
  { id: '99-night', name: '99 NIGHT', icon: 'Moon', color: 'from-indigo-500 to-purple-500', bugs: 3 },
  { id: 'steal-brainrot', name: 'STEAL A BRAINROT', icon: 'Brain', color: 'from-purple-500 to-violet-500', bugs: 3 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-secondary rounded-full animate-pulse delay-100"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl rounded-full"></div>
            <h1 className="text-7xl md:text-9xl font-black relative glitch tracking-wider">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
                ROBLOX
              </span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
            <h2 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-[0.3em]">
              BUG DATABASE
            </h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            // Exploits & Glitches Archive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-8">
          {games.map((game, index) => (
            <Link key={game.id} to={`/game/${game.id}`}>
              <Card 
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 cursor-pointer h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-primary to-secondary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/50">
                    <span className="text-xs font-bold text-primary">{game.bugs} BUGS</span>
                  </div>
                </div>

                <CardContent className="p-6 relative">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${game.color} blur-xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                      <div className={`relative w-20 h-20 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/60 transition-all group-hover:rotate-6 transform`}>
                        <Icon name={game.icon} size={36} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-foreground mb-1 group-hover:text-primary transition-colors tracking-wide">
                        {game.name}
                      </h3>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider font-mono">
                        &gt; View exploits_
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
                      <Icon 
                        name="ChevronRight" 
                        size={32} 
                        className="text-primary group-hover:translate-x-2 transition-transform relative" 
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="font-mono">STATUS: ACTIVE</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg px-6 py-3">
            <p className="text-muted-foreground text-xs uppercase tracking-wider font-mono">
              // SELECT_GAME_TO_VIEW_DATABASE
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
    </div>
  );
};

export default Index;
