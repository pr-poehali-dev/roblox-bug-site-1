import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Bug {
  id: number;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const gameData: Record<string, { name: string; bugs: Bug[] }> = {
  'rivas': {
    name: 'RIVAS',
    bugs: [
      { 
        id: 1, 
        title: 'Fly Glitch - полёт без читов', 
        description: 'Баг позволяет летать без использования эксплоитов. Метод: запрыгни на край объекта (например, крыша дома), нажми прыжок + одновременно открой и закрой инвентарь 3 раза подряд очень быстро. Персонаж зависнет в воздухе на 2-3 секунды. Повторяй действие, чтобы постепенно подниматься выше. Работает в большинстве игр Roblox. Разработчики знают об этом баге с 2019 года, но так и не пофиксили полностью.', 
        severity: 'high' 
      },
      { 
        id: 2, 
        title: 'Wall Clip через Shift Lock', 
        description: 'Баг с камерой позволяет проходить сквозь тонкие стены. Включи Shift Lock, встань вплотную к стене, затем быстро двигай камеру влево-вправо, одновременно зажимая W. При правильном угле персонаж проваливается сквозь стену. Особенно эффективно на стенах толщиной 1 стад. Используется для проникновения в закрытые зоны, сейфы банков в RP играх.', 
        severity: 'critical' 
      },
      { 
        id: 3, 
        title: 'Speed Glitch через эмоции', 
        description: 'При использовании определённых анимаций эмоций во время бега скорость персонажа увеличивается на 30-40%. Запусти эмоцию "/e dance2" или "/e wave" во время движения, затем сразу отмени её нажатием на Backspace. Скорость останется повышенной на 5-10 секунд. Можно использовать в гонках, побегах от полиции в RP играх. Баг работает только с определёнными старыми анимациями.', 
        severity: 'medium' 
      },
    ],
  },
  'grow-garden': {
    name: 'GROW A GARDEN',
    bugs: [
      { 
        id: 1, 
        title: 'Infinite Yield Command Bar', 
        description: 'Баг позволяет открыть встроенную командную строку без внешних скриптов. Нажми F9 для открытия консоли разработчика, затем введи команду "game:GetService(\"Players\").LocalPlayer.Chatted:Connect(function(msg) print(msg) end)" и нажми Enter. После этого любые команды, начинающиеся с ";" в чате, будут выполняться как Roblox команды. Позволяет использовать команды типа ";fly", ";noclip", ";god" в некоторых старых играх.', 
        severity: 'critical' 
      },
      { 
        id: 2, 
        title: 'Server Hop для дюпа предметов', 
        description: 'Баг с синхронизацией между серверами. Положи ценный предмет в сундук/хранилище, затем быстро сменяй сервер через Roblox меню. Если время между действиями меньше 2 секунд, предмет останется и в хранилище, и в твоём инвентаре на новом сервере. Работает только в играх с облачным сохранением. Используется для дюпа питомцев в Adopt Me, оружия в FPS играх.', 
        severity: 'critical' 
      },
      { 
        id: 3, 
        title: 'Avatar Reset Abuse', 
        description: 'Использование команды Reset Character (/resetcharacter или Esc > Reset) в определённый момент позволяет обойти ограничения игр. Например, в обби - телепортироваться на последний чекпоинт вместо старта, в тюремных играх - выйти из тюрьмы, в PvP - избежать смерти и сохранить предметы. Работает из-за неправильной обработки события смерти разработчиками игр. В некоторых играх за это банят.', 
        severity: 'medium' 
      },
    ],
  },
  '99-night': {
    name: '99 NIGHT',
    bugs: [
      { 
        id: 1, 
        title: 'Collision Bug для прохождения через объекты', 
        description: 'Универсальный баг коллизий Roblox. Встань между двумя объектами, которые расположены очень близко друг к другу, затем прыгай и вращай камеру. При правильном угле персонаж протолкнётся сквозь один из объектов. Работает на дверях, стенах, заборах. В играх типа "тюрьма" используется для побега. Эффективность зависит от толщины объектов - чем тоньше, тем проще пройти.', 
        severity: 'high' 
      },
      { 
        id: 2, 
        title: 'FPS Unlocker эксплоит', 
        description: 'Программа FPS Unlocker снимает ограничение Roblox в 60 FPS. При FPS выше 144 физика игры начинает работать неправильно: прыжки становятся выше, скорость бега увеличивается, некоторые барьеры можно перепрыгнуть. Это не читы, но даёт огромное преимущество в обби, паркуре, гонках. Официально Roblox не банит за FPS Unlocker, но в соревновательных режимах это считается нечестной игрой.', 
        severity: 'medium' 
      },
      { 
        id: 3, 
        title: 'Chat Bypass для обхода фильтра', 
        description: 'Различные методы обхода Roblox чат-фильтра. Используй символы типа "а" (кириллица) вместо "a" (латиница), вставляй нулевые пробелы между буквами (копируй из специальных сайтов), или добавляй точки между словами. Например: "р.о.б.у.к.с" пройдёт через фильтр. Технически это нарушение правил Roblox, за систематическое использование могут дать бан аккаунта на 1-3 дня.', 
        severity: 'low' 
      },
    ],
  },
  'steal-brainrot': {
    name: 'STEAL A BRAINROT',
    bugs: [
      { 
        id: 1, 
        title: 'Trading Scam через Trade Window Bug', 
        description: 'Баг в системе трейда позволяет быстро менять предметы. Добавь дешёвый предмет в трейд, жди пока другой игрок примет. За 0.1 секунды до его подтверждения отмени трейд, убери дешёвый предмет, добавь ценный и мгновенно нажми Accept. Из-за лага интерфейса другой игрок видит старый список предметов. Технически это мошенничество, за которое дают перманентный бан. Используется в Adopt Me, Murder Mystery 2, Trading Games.', 
        severity: 'critical' 
      },
      { 
        id: 2, 
        title: 'Невидимость через отключение рендера', 
        description: 'Баг с отрисовкой персонажа делает тебя полностью невидимым для других игроков. Для активации: зайди в настройки графики, поставь качество на минимум, затем быстро переключи на максимум и сразу нажми Alt + Enter (переход в оконный режим) 3 раза подряд. Модель персонажа перестаёт отрисовываться на стороне других игроков, но ты видишь себя нормально. Можно красть brainrot невидимым. Эффект держится до перезахода.', 
        severity: 'high' 
      },
      { 
        id: 3, 
        title: 'Бесконечная скорость бега', 
        description: 'Глитч с системой стамины позволяет бегать с удвоенной скоростью без потери выносливости. Метод: во время бега (Shift зажат) открой инвентарь и начни использовать любой предмет, затем закрой инвентарь, не отпуская Shift. Скорость удваивается, стамина не тратится. Огромное преимущество в погонях за brainrot. Можно убегать от любого противника или первым добегать до спавна редких brainrot.', 
        severity: 'high' 
      },
    ],
  },
};

const severityColors = {
  low: 'text-green-500 border-green-500/30 bg-green-500/10',
  medium: 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10',
  high: 'text-orange-500 border-orange-500/30 bg-orange-500/10',
  critical: 'text-red-500 border-red-500/30 bg-red-500/10',
};

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { toast } = useToast();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const STORAGE_KEY = `roblox_bugs_${gameId}`;
  
  const [bugs, setBugs] = useState<Bug[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved bugs:', e);
      }
    }
    return gameId ? gameData[gameId]?.bugs || [] : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bugs));
  }, [bugs, STORAGE_KEY]);
  const [editingBug, setEditingBug] = useState<Bug | null>(null);
  const [newBugTitle, setNewBugTitle] = useState('');
  const [newBugDescription, setNewBugDescription] = useState('');
  const [newBugSeverity, setNewBugSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');

  const game = gameId ? gameData[gameId] : null;

  const handleCodeSubmit = () => {
    if (codeInput === '3258') {
      setIsAdminMode(true);
      setShowCodeDialog(false);
      toast({
        title: 'Админ-режим активирован',
        description: 'Теперь вы можете редактировать баги',
      });
    } else {
      toast({
        title: 'Неверный код',
        description: 'Попробуйте еще раз',
        variant: 'destructive',
      });
    }
    setCodeInput('');
  };

  const handleAddBug = () => {
    if (!newBugTitle || !newBugDescription) return;
    const newBug: Bug = {
      id: bugs.length + 1,
      title: newBugTitle,
      description: newBugDescription,
      severity: newBugSeverity,
    };
    setBugs([...bugs, newBug]);
    setNewBugTitle('');
    setNewBugDescription('');
    setNewBugSeverity('medium');
    toast({
      title: 'Баг добавлен',
      description: 'Новый баг успешно добавлен в список',
    });
  };

  const handleEditBug = (bug: Bug) => {
    setEditingBug(bug);
    setNewBugTitle(bug.title);
    setNewBugDescription(bug.description);
    setNewBugSeverity(bug.severity);
  };

  const handleUpdateBug = () => {
    if (!editingBug || !newBugTitle || !newBugDescription) return;
    setBugs(bugs.map(bug => 
      bug.id === editingBug.id 
        ? { ...bug, title: newBugTitle, description: newBugDescription, severity: newBugSeverity }
        : bug
    ));
    setEditingBug(null);
    setNewBugTitle('');
    setNewBugDescription('');
    setNewBugSeverity('medium');
    toast({
      title: 'Баг обновлен',
      description: 'Информация о баге успешно обновлена',
    });
  };

  const handleDeleteBug = (bugId: number) => {
    setBugs(bugs.filter(bug => bug.id !== bugId));
    toast({
      title: 'Баг удален',
      description: 'Баг удален из списка',
    });
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-background cyber-grid flex items-center justify-center">
        <Card className="bg-card border-2 border-destructive/50">
          <CardContent className="p-8 text-center">
            <Icon name="AlertCircle" size={48} className="text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Игра не найдена</h2>
            <Link to="/">
              <Button variant="outline" className="mt-4">
                <Icon name="Home" size={16} className="mr-2" />
                Вернуться на главную
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4 neon-glow">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад к играм
            </Button>
          </Link>
          <h1 className="text-5xl md:text-7xl font-black mb-2 glitch">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {game.name}
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary neon-glow"></div>
        </div>

        {isAdminMode && (
          <Card className="mb-8 bg-gradient-to-br from-card to-secondary/5 border-2 border-secondary neon-glow-purple relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <Icon name="ShieldCheck" size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">ADMIN PANEL</div>
                  <div className="text-xs text-muted-foreground font-normal">Управление базой багов</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary flex items-center gap-2">
                  <Icon name="Tag" size={14} />
                  Название бага
                </label>
                <Input
                  placeholder="Введите название бага..."
                  value={newBugTitle}
                  onChange={(e) => setNewBugTitle(e.target.value)}
                  className="bg-background/50 border-2 border-secondary/30 focus:border-secondary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary flex items-center gap-2">
                  <Icon name="FileText" size={14} />
                  Подробное описание
                </label>
                <Textarea
                  placeholder="Опишите баг максимально подробно: как воспроизвести, что происходит, последствия..."
                  value={newBugDescription}
                  onChange={(e) => setNewBugDescription(e.target.value)}
                  className="bg-background/50 border-2 border-secondary/30 focus:border-secondary transition-all min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary flex items-center gap-2">
                  <Icon name="AlertTriangle" size={14} />
                  Уровень опасности
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['low', 'medium', 'high', 'critical'] as const).map((sev) => (
                    <Button
                      key={sev}
                      variant={newBugSeverity === sev ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewBugSeverity(sev)}
                      className={newBugSeverity === sev ? 'neon-glow' : ''}
                    >
                      {sev}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <Button 
                  onClick={editingBug ? handleUpdateBug : handleAddBug} 
                  className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90 transition-all neon-glow-purple font-bold"
                  size="lg"
                >
                  <Icon name={editingBug ? "RefreshCw" : "Plus"} size={18} className="mr-2" />
                  {editingBug ? 'Обновить баг' : 'Добавить баг'}
                </Button>
                {editingBug && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingBug(null);
                      setNewBugTitle('');
                      setNewBugDescription('');
                      setNewBugSeverity('medium');
                    }}
                    className="w-full"
                  >
                    <Icon name="X" size={16} className="mr-2" />
                    Отменить редактирование
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {bugs.map((bug) => (
            <Card key={bug.id} className="bg-card border-2 border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2 text-foreground">{bug.title}</CardTitle>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase border ${severityColors[bug.severity]}`}>
                      {bug.severity}
                    </span>
                  </div>
                  {isAdminMode && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditBug(bug)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteBug(bug.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{bug.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {bugs.length === 0 && (
          <Card className="bg-card border-2 border-primary/20">
            <CardContent className="p-12 text-center">
              <Icon name="FileQuestion" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Баги пока не добавлены</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 left-4 w-12 h-12 rounded-full border-2 border-primary/50 bg-background/80 backdrop-blur-sm hover:bg-background neon-glow"
          >
            <Icon name="Lock" size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border-2 border-primary">
          <DialogHeader>
            <DialogTitle className="text-2xl">Введите код доступа</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Код доступа"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
              className="bg-background border-primary/30"
            />
            <Button onClick={handleCodeSubmit} className="w-full">
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GamePage;