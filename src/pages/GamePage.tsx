import { useState } from 'react';
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
      { id: 1, title: 'Бесконечные деньги через дюп', description: 'Дублирование предметов в инвентаре при быстром нажатии', severity: 'critical' },
      { id: 2, title: 'Пролетаем через стены', description: 'Баг с коллизией в северной части карты', severity: 'high' },
    ],
  },
  'grow-garden': {
    name: 'GROW A GARDEN',
    bugs: [
      { id: 1, title: 'Растения исчезают', description: 'При перезаходе в игру растения пропадают из инвентаря', severity: 'high' },
      { id: 2, title: 'Бесплатные семена', description: 'Можно получить семена без оплаты через магазин', severity: 'medium' },
    ],
  },
  'adopt-me': {
    name: 'ADOPT ME',
    bugs: [
      { id: 1, title: 'Дюп питомцев', description: 'Дублирование питомцев через трейд', severity: 'critical' },
      { id: 2, title: 'Бесконечный опыт', description: 'Фарм опыта через баг с кормлением', severity: 'high' },
    ],
  },
  'steal-brainrot': {
    name: 'STEAL A BRAINROT',
    bugs: [
      { id: 1, title: 'Телепорт к игрокам', description: 'Можно телепортироваться к любому игроку на карте', severity: 'critical' },
      { id: 2, title: 'Невидимость', description: 'Баг с отключением рендера персонажа', severity: 'high' },
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
  const [bugs, setBugs] = useState<Bug[]>(gameId ? gameData[gameId]?.bugs || [] : []);
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
          <Card className="mb-8 bg-card border-2 border-secondary/50 neon-glow-purple">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Icon name="Settings" size={24} />
                Админ-панель
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Название бага"
                value={newBugTitle}
                onChange={(e) => setNewBugTitle(e.target.value)}
                className="bg-background border-secondary/30"
              />
              <Textarea
                placeholder="Описание бага"
                value={newBugDescription}
                onChange={(e) => setNewBugDescription(e.target.value)}
                className="bg-background border-secondary/30"
              />
              <div className="flex gap-2">
                {(['low', 'medium', 'high', 'critical'] as const).map((sev) => (
                  <Button
                    key={sev}
                    variant={newBugSeverity === sev ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewBugSeverity(sev)}
                  >
                    {sev}
                  </Button>
                ))}
              </div>
              <Button onClick={editingBug ? handleUpdateBug : handleAddBug} className="w-full">
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
                  Отменить редактирование
                </Button>
              )}
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
