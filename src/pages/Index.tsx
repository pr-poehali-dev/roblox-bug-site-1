import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const games = [
  { id: 'rivas', name: 'RIVAS', icon: 'Zap', color: 'from-cyan-500 to-blue-500' },
  { id: 'grow-garden', name: 'GROW A GARDEN', icon: 'Flower2', color: 'from-green-500 to-emerald-500' },
  { id: '99-night', name: '99 NIGHT', icon: 'Moon', color: 'from-indigo-500 to-purple-500' },
  { id: 'steal-brainrot', name: 'STEAL A BRAINROT', icon: 'Brain', color: 'from-purple-500 to-violet-500' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-4 glitch">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ROBLOX
            </span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground/90 mb-2">
            BUG DATABASE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto neon-glow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {games.map((game) => (
            <Link key={game.id} to={`/game/${game.id}`}>
              <Card className="group relative overflow-hidden bg-card border-2 border-primary/20 hover:border-primary transition-all duration-300 cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center neon-glow group-hover:neon-glow-purple transition-all`}>
                      <Icon name={game.icon} size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {game.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">Нажми для просмотра багов</p>
                    </div>
                    <Icon name="ChevronRight" size={24} className="text-primary group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground text-sm">
            Выбери игру, чтобы увидеть список багов
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;