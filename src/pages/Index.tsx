import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type SavedItem = {
  id: string;
  title: string;
  section: string;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProgress, setUserProgress] = useState(45);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const saveItem = (item: SavedItem) => {
    if (savedItems.find(i => i.id === item.id)) {
      setSavedItems(savedItems.filter(i => i.id !== item.id));
      toast.success('Удалено из избранного');
    } else {
      setSavedItems([...savedItems, item]);
      setUserProgress(Math.min(userProgress + 5, 100));
      toast.success('Добавлено в избранное');
    }
  };

  const isSaved = (id: string) => savedItems.some(item => item.id === id);

  const submitQuiz = () => {
    let score = 0;
    if (quizAnswers.q1 === 'b') score += 25;
    if (quizAnswers.q2 === 'c') score += 25;
    if (quizAnswers.q3 === 'a') score += 25;
    if (quizAnswers.q4 === 'b') score += 25;
    setQuizScore(score);
    setUserProgress(Math.min(userProgress + 10, 100));
    toast.success(`Тест завершён! Ваш результат: ${score}%`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-purple-50 to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Heart" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                  ЗдоровЛайф
                </h1>
                <p className="text-xs text-gray-600">Твой путь к здоровью</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              variant="outline"
              className="gap-2 hover:bg-lime-50 border-lime-200"
            >
              <Icon name="User" size={18} />
              Личный кабинет
            </Button>
          </div>
        </div>
      </header>

      {isProfileOpen && (
        <div className="container mx-auto px-4 py-6">
          <Card className="border-lime-200 shadow-xl animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-lime-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Trophy" size={24} />
                Мой прогресс
              </CardTitle>
              <CardDescription className="text-lime-50">
                Продолжай изучать материалы и собирать достижения!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">Общий прогресс</span>
                  <span className="text-lime-600 font-bold">{userProgress}%</span>
                </div>
                <Progress value={userProgress} className="h-3" />
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Bookmark" size={18} className="text-purple-600" />
                  Избранные материалы ({savedItems.length})
                </h4>
                {savedItems.length === 0 ? (
                  <p className="text-gray-500 text-sm">Пока нет сохранённых материалов</p>
                ) : (
                  <div className="space-y-2">
                    {savedItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-gray-600">{item.section}</p>
                        </div>
                        <Badge variant="secondary">{item.section}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2 bg-white/50 p-2 rounded-xl shadow-lg">
            <TabsTrigger value="home" className="data-[state=active]:bg-lime-500 data-[state=active]:text-white gap-2">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="basics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white gap-2">
              <Icon name="Heart" size={16} />
              <span className="hidden sm:inline">Основы ЗОЖ</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white gap-2">
              <Icon name="Apple" size={16} />
              <span className="hidden sm:inline">Питание</span>
            </TabsTrigger>
            <TabsTrigger value="prevention" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white gap-2">
              <Icon name="Shield" size={16} />
              <span className="hidden sm:inline">Профилактика</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white gap-2">
              <Icon name="Brain" size={16} />
              <span className="hidden sm:inline">Тесты</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-lime-500 data-[state=active]:text-white gap-2">
              <Icon name="Mail" size={16} />
              <span className="hidden sm:inline">Контакты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <section className="relative overflow-hidden bg-gradient-to-br from-lime-500 via-green-500 to-emerald-600 rounded-3xl p-12 shadow-2xl">
              <div className="relative z-10 max-w-3xl">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">Образовательная платформа</Badge>
                <h2 className="text-5xl font-bold text-white mb-4">
                  Здоровый образ жизни — это просто!
                </h2>
                <p className="text-xl text-lime-50 mb-6">
                  Узнай всё о правильном питании, физической активности и профилактике вредных привычек
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => setActiveTab('basics')} className="bg-white text-lime-600 hover:bg-lime-50 shadow-lg">
                    <Icon name="Rocket" size={20} className="mr-2" />
                    Начать обучение
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveTab('quiz')} className="border-white text-white hover:bg-white/20">
                    <Icon name="CheckCircle" size={20} className="mr-2" />
                    Пройти тест
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-all duration-300 hover-scale border-lime-200">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon name="Activity" className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-lime-700">Основы здоровья</CardTitle>
                  <CardDescription>Изучи базовые принципы здорового образа жизни</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab('basics')} className="w-full bg-lime-500 hover:bg-lime-600">
                    Перейти к разделу
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover-scale border-orange-200">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon name="Salad" className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-orange-700">Правильное питание</CardTitle>
                  <CardDescription>Рецепты и советы для здорового рациона</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab('nutrition')} className="w-full bg-orange-500 hover:bg-orange-600">
                    Узнать больше
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover-scale border-blue-200">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon name="ShieldCheck" className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-blue-700">Профилактика</CardTitle>
                  <CardDescription>Защити себя от вредных привычек</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab('prevention')} className="w-full bg-blue-500 hover:bg-blue-600">
                    Изучить
                  </Button>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="basics" className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent mb-3">
                Основы здорового образа жизни
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Здоровье — это баланс физической активности, правильного питания и позитивного настроя
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-purple-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Icon name="Dumbbell" className="text-purple-600" size={24} />
                      </div>
                      <CardTitle className="text-purple-700">Физическая активность</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveItem({ id: 'basics-1', title: 'Физическая активность', section: 'Основы ЗОЖ' })}
                      className={isSaved('basics-1') ? 'text-purple-600' : 'text-gray-400'}
                    >
                      <Icon name="Bookmark" size={20} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">Минимум 30 минут активности в день:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Утренняя зарядка 10-15 минут
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Прогулка на свежем воздухе
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Спортивные игры и тренировки
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Растяжка перед сном
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon name="Moon" className="text-blue-600" size={24} />
                      </div>
                      <CardTitle className="text-blue-700">Здоровый сон</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveItem({ id: 'basics-2', title: 'Здоровый сон', section: 'Основы ЗОЖ' })}
                      className={isSaved('basics-2') ? 'text-purple-600' : 'text-gray-400'}
                    >
                      <Icon name="Bookmark" size={20} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">Для подростков нужно 8-10 часов сна:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Ложиться в одно и то же время
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Избегать гаджетов за час до сна
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Проветривать комнату
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Спать в темноте и тишине
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-orange-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Icon name="Droplets" className="text-orange-600" size={24} />
                      </div>
                      <CardTitle className="text-orange-700">Водный баланс</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveItem({ id: 'basics-3', title: 'Водный баланс', section: 'Основы ЗОЖ' })}
                      className={isSaved('basics-3') ? 'text-purple-600' : 'text-gray-400'}
                    >
                      <Icon name="Bookmark" size={20} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">1.5-2 литра чистой воды в день:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Стакан воды после пробуждения
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Пить во время занятий спортом
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Избегать сладких газировок
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Носить бутылку воды с собой
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-lime-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
                        <Icon name="Smile" className="text-lime-600" size={24} />
                      </div>
                      <CardTitle className="text-lime-700">Психологическое здоровье</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveItem({ id: 'basics-4', title: 'Психологическое здоровье', section: 'Основы ЗОЖ' })}
                      className={isSaved('basics-4') ? 'text-purple-600' : 'text-gray-400'}
                    >
                      <Icon name="Bookmark" size={20} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">Заботься о ментальном здоровье:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Общайся с друзьями и семьёй
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Занимайся любимым хобби
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Делись переживаниями
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-lime-500" size={16} />
                      Практикуй медитацию и дыхание
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
                Здоровое питание и рецепты
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Правильное питание — основа здоровья и хорошего самочувствия
              </p>
            </div>

            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Icon name="Lightbulb" size={24} />
                  Основные принципы здорового питания
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Apple" className="text-lime-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Больше овощей и фруктов</h4>
                      <p className="text-sm text-gray-600">5 порций в день разных цветов</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Wheat" className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Цельнозерновые продукты</h4>
                      <p className="text-sm text-gray-600">Каши, хлеб из цельного зерна</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Fish" className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Белок каждый день</h4>
                      <p className="text-sm text-gray-600">Рыба, мясо, бобовые, яйца</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Milk" className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Молочные продукты</h4>
                      <p className="text-sm text-gray-600">Йогурт, творог, кефир без добавок</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="XCircle" className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Меньше сахара и соли</h4>
                      <p className="text-sm text-gray-600">Ограничь сладости и фастфуд</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Регулярное питание</h4>
                      <p className="text-sm text-gray-600">3-5 приёмов пищи в день</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-lime-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lime-700">Смузи-боул</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveItem({ id: 'recipe-1', title: 'Смузи-боул', section: 'Питание' })}
                      className={isSaved('recipe-1') ? 'text-purple-600' : 'text-gray-400'}
                    >
                      <Icon name="Bookmark" size={20} />
                    </Button>
                  </div>
                  <CardDescription>Полезный завтрак за 5 минут</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-lime-100 text-lime-700">Завтрак</Badge>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Банан 1 шт</li>
                    <li>• Ягоды 150 г</li>
                    <li>• Йогурт 100 мл</li>
                    <li>• Мёд 1 ч.л.</li>
                    <li>• Орехи и семена</li>
                  </ul>
                  <p className="text-sm text-gray-700 pt-2">
                    Взбей всё в блендере, укрась топпингами — готово!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-orange-700">Овощной салат</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveItem({ id: 'recipe-2', title: 'Овощной салат', section: 'Питание' })}
                      className={isSaved('recipe-2') ? 'text-purple-600' : 'text-gray-400'}
                    >
                      <Icon name="Bookmark" size={20} />
                    </Button>
                  </div>
                  <CardDescription>Лёгкий обед с витаминами</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-orange-100 text-orange-700">Обед</Badge>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Помидоры 2 шт</li>
                    <li>• Огурцы 2 шт</li>
                    <li>• Перец 1 шт</li>
                    <li>• Листья салата</li>
                    <li>• Оливковое масло</li>
                  </ul>
                  <p className="text-sm text-gray-700 pt-2">
                    Нарежь овощи, заправь маслом и лимонным соком.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-blue-700">Запечённая рыба</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveItem({ id: 'recipe-3', title: 'Запечённая рыба', section: 'Питание' })}
                      className={isSaved('recipe-3') ? 'text-purple-600' : 'text-gray-400'}
                    >
                      <Icon name="Bookmark" size={20} />
                    </Button>
                  </div>
                  <CardDescription>Полезный ужин с белком</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-blue-100 text-blue-700">Ужин</Badge>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Филе рыбы 200 г</li>
                    <li>• Лимон 0.5 шт</li>
                    <li>• Специи по вкусу</li>
                    <li>• Брокколи 150 г</li>
                    <li>• Оливковое масло</li>
                  </ul>
                  <p className="text-sm text-gray-700 pt-2">
                    Запекай 20 минут при 180°C с овощами.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prevention" className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                Профилактика вредных привычек
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Знание — сила. Защити себя от зависимостей
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <Icon name="Cigarette" className="text-red-600" size={24} />
                    </div>
                    <CardTitle className="text-red-700">Курение</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="font-semibold text-red-800 mb-2">Последствия:</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• Болезни лёгких и сердца</li>
                      <li>• Снижение выносливости</li>
                      <li>• Старение кожи</li>
                      <li>• Зависимость от никотина</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2">Как избежать:</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Найди здоровые хобби</li>
                      <li>• Не поддавайся давлению</li>
                      <li>• Общайся с некурящими</li>
                      <li>• Помни о последствиях</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Icon name="Wine" className="text-purple-600" size={24} />
                    </div>
                    <CardTitle className="text-purple-700">Алкоголь</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="font-semibold text-red-800 mb-2">Последствия:</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• Повреждение печени и мозга</li>
                      <li>• Снижение успеваемости</li>
                      <li>• Потеря контроля</li>
                      <li>• Формирование зависимости</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2">Как избежать:</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Умей говорить "нет"</li>
                      <li>• Выбирай безалкогольные напитки</li>
                      <li>• Занимайся спортом</li>
                      <li>• Цени своё здоровье</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Icon name="Smartphone" className="text-orange-600" size={24} />
                    </div>
                    <CardTitle className="text-orange-700">Гаджеты</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="font-semibold text-red-800 mb-2">Последствия:</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• Проблемы со зрением</li>
                      <li>• Нарушение сна</li>
                      <li>• Снижение концентрации</li>
                      <li>• Социальная изоляция</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2">Здоровые привычки:</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Ограничь экранное время</li>
                      <li>• Делай перерывы каждый час</li>
                      <li>• Убирай телефон перед сном</li>
                      <li>• Живое общение важнее</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon name="Candy" className="text-blue-600" size={24} />
                    </div>
                    <CardTitle className="text-blue-700">Сахар</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="font-semibold text-red-800 mb-2">Последствия:</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• Набор лишнего веса</li>
                      <li>• Проблемы с зубами</li>
                      <li>• Усталость и раздражение</li>
                      <li>• Риск диабета</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2">Здоровые альтернативы:</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Фрукты вместо конфет</li>
                      <li>• Мёд вместо сахара</li>
                      <li>• Орехи для перекуса</li>
                      <li>• Вода вместо газировки</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-lime-200 shadow-lg bg-gradient-to-r from-lime-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lime-700">
                  <Icon name="Heart" size={24} />
                  Помни главное
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Вредные привычки не делают тебя взрослее или круче. Настоящая сила — в умении заботиться о себе 
                  и принимать правильные решения. Если чувствуешь давление от окружающих, помни: твоё здоровье 
                  важнее чужого мнения. Всегда можно обратиться за помощью к родителям, учителям или психологу.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Тест: Проверь свои знания
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ответь на вопросы и узнай, насколько хорошо ты знаешь основы ЗОЖ
              </p>
            </div>

            {quizScore === null ? (
              <Card className="border-purple-200 shadow-xl max-w-3xl mx-auto">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Brain" size={24} />
                    Викторина о здоровом образе жизни
                  </CardTitle>
                  <CardDescription className="text-purple-50">
                    Выбери правильные ответы на все вопросы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 pt-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-800">
                      1. Сколько часов сна нужно подросткам?
                    </Label>
                    <RadioGroup value={quizAnswers.q1} onValueChange={(val) => setQuizAnswers({...quizAnswers, q1: val})}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                        <RadioGroupItem value="a" id="q1a" />
                        <Label htmlFor="q1a" className="cursor-pointer flex-1">5-6 часов</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                        <RadioGroupItem value="b" id="q1b" />
                        <Label htmlFor="q1b" className="cursor-pointer flex-1">8-10 часов</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                        <RadioGroupItem value="c" id="q1c" />
                        <Label htmlFor="q1c" className="cursor-pointer flex-1">12-14 часов</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-800">
                      2. Сколько порций овощей и фруктов рекомендуется есть в день?
                    </Label>
                    <RadioGroup value={quizAnswers.q2} onValueChange={(val) => setQuizAnswers({...quizAnswers, q2: val})}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="a" id="q2a" />
                        <Label htmlFor="q2a" className="cursor-pointer flex-1">1-2 порции</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="b" id="q2b" />
                        <Label htmlFor="q2b" className="cursor-pointer flex-1">3 порции</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="c" id="q2c" />
                        <Label htmlFor="q2c" className="cursor-pointer flex-1">5 порций</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-800">
                      3. Сколько минут физической активности нужно в день?
                    </Label>
                    <RadioGroup value={quizAnswers.q3} onValueChange={(val) => setQuizAnswers({...quizAnswers, q3: val})}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-lime-50 transition-colors">
                        <RadioGroupItem value="a" id="q3a" />
                        <Label htmlFor="q3a" className="cursor-pointer flex-1">Минимум 30 минут</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-lime-50 transition-colors">
                        <RadioGroupItem value="b" id="q3b" />
                        <Label htmlFor="q3b" className="cursor-pointer flex-1">10 минут</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-lime-50 transition-colors">
                        <RadioGroupItem value="c" id="q3c" />
                        <Label htmlFor="q3c" className="cursor-pointer flex-1">2 часа</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-800">
                      4. Какой напиток лучше всего утоляет жажду?
                    </Label>
                    <RadioGroup value={quizAnswers.q4} onValueChange={(val) => setQuizAnswers({...quizAnswers, q4: val})}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                        <RadioGroupItem value="a" id="q4a" />
                        <Label htmlFor="q4a" className="cursor-pointer flex-1">Сладкая газировка</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                        <RadioGroupItem value="b" id="q4b" />
                        <Label htmlFor="q4b" className="cursor-pointer flex-1">Чистая вода</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                        <RadioGroupItem value="c" id="q4c" />
                        <Label htmlFor="q4c" className="cursor-pointer flex-1">Энергетики</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button 
                    onClick={submitQuiz} 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={Object.keys(quizAnswers).length < 4}
                  >
                    <Icon name="CheckCircle" className="mr-2" size={20} />
                    Проверить ответы
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-lime-200 shadow-xl max-w-3xl mx-auto">
                <CardHeader className={`${quizScore >= 75 ? 'bg-gradient-to-r from-lime-500 to-green-500' : 'bg-gradient-to-r from-orange-500 to-red-500'} text-white`}>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name={quizScore >= 75 ? "Trophy" : "Target"} size={24} />
                    Результаты теста
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="text-center space-y-4">
                    <div className={`text-7xl font-bold ${quizScore >= 75 ? 'text-lime-600' : 'text-orange-600'}`}>
                      {quizScore}%
                    </div>
                    <p className="text-xl text-gray-700">
                      {quizScore === 100 && "Отлично! Ты эксперт в вопросах ЗОЖ! 🏆"}
                      {quizScore >= 75 && quizScore < 100 && "Хороший результат! Продолжай в том же духе! 💪"}
                      {quizScore >= 50 && quizScore < 75 && "Неплохо! Изучи материалы ещё раз. 📚"}
                      {quizScore < 50 && "Стоит повторить основы ЗОЖ. Попробуй ещё раз! 🎯"}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-3">Правильные ответы:</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-start gap-2">
                        <Icon name="Check" className="text-lime-500 flex-shrink-0 mt-0.5" size={16} />
                        <span><strong>Вопрос 1:</strong> 8-10 часов сна для подростков</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Icon name="Check" className="text-lime-500 flex-shrink-0 mt-0.5" size={16} />
                        <span><strong>Вопрос 2:</strong> 5 порций овощей и фруктов в день</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Icon name="Check" className="text-lime-500 flex-shrink-0 mt-0.5" size={16} />
                        <span><strong>Вопрос 3:</strong> Минимум 30 минут активности</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Icon name="Check" className="text-lime-500 flex-shrink-0 mt-0.5" size={16} />
                        <span><strong>Вопрос 4:</strong> Чистая вода — лучший выбор</span>
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      setQuizScore(null);
                      setQuizAnswers({});
                    }}
                    size="lg"
                    className="w-full"
                    variant="outline"
                  >
                    <Icon name="RotateCcw" className="mr-2" size={20} />
                    Пройти тест ещё раз
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent mb-3">
                Свяжись с нами
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Остались вопросы? Мы всегда рады помочь!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-lime-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-lime-50 to-green-50">
                  <CardTitle className="flex items-center gap-2 text-lime-700">
                    <Icon name="Mail" size={24} />
                    Форма обратной связи
                  </CardTitle>
                  <CardDescription>Напиши нам — ответим в течение дня</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Твоё имя</Label>
                      <Input id="name" placeholder="Как тебя зовут?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Задай свой вопрос или поделись мнением о сайте..." 
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600">
                      <Icon name="Send" className="mr-2" size={18} />
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-purple-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <Icon name="Phone" size={24} />
                      Горячая линия поддержки
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="PhoneCall" className="text-purple-600 mt-1" size={20} />
                      <div>
                        <p className="font-semibold text-gray-800">8-996-460-65-11</p>
                        <p className="text-sm text-gray-600">Звонок бесплатный, круглосуточно</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" className="text-purple-600 mt-1" size={20} />
                      <div>
                        <p className="font-semibold text-gray-800">nikitavarlyga@mail.ru</p>
                        <p className="text-sm text-gray-600">Ответим на email в течение суток</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      <Icon name="Users" size={24} />
                      Социальные сети
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
                        <Icon name="MessageCircle" size={18} />
                        Telegram
                      </Button>
                      <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
                        <Icon name="Instagram" size={18} />
                        Instagram
                      </Button>
                      <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
                        <Icon name="Youtube" size={18} />
                        YouTube
                      </Button>
                      <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
                        <Icon name="Twitter" size={18} />
                        Twitter
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Если тебе нужна срочная психологическая помощь, звони на детский телефон доверия: 
                        <strong className="block mt-1 text-blue-600 text-lg">8-800-2000-122</strong>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Icon name="Heart" className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold">ЗдоровЛайф</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Образовательная платформа о здоровом образе жизни для школьников
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Разделы</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveTab('basics')} className="hover:text-lime-400 transition-colors">Основы ЗОЖ</button></li>
                <li><button onClick={() => setActiveTab('nutrition')} className="hover:text-lime-400 transition-colors">Питание</button></li>
                <li><button onClick={() => setActiveTab('prevention')} className="hover:text-lime-400 transition-colors">Профилактика</button></li>
                <li><button onClick={() => setActiveTab('quiz')} className="hover:text-lime-400 transition-colors">Тесты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: nikitavarlyga@mail.ru</li>
                <li>Телефон: 8-996-460-65-11</li>
                <li className="pt-2 text-xs text-gray-500">© 2024 ЗдоровЛайф. Все права защищены.</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;