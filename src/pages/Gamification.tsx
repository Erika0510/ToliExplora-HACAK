import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Award, 
  Star, 
  Target, 
  Zap, 
  Crown, 
  Medal,
  Gift,
  Flame,
  Sparkles
} from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  completed: boolean;
}

const Gamification = () => {
  const [userLevel] = useState(12);
  const [userXP] = useState(2450);
  const [nextLevelXP] = useState(3000);
  const [userCoins] = useState(1250);
  const [streakDays] = useState(7);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Primer Explorador",
      description: "Completa tu primera exploración",
      icon: <Star className="w-6 h-6 text-green-600" />,
      unlocked: true,
    },
    {
      id: 2,
      title: "Aventurero Dedicado",
      description: "Explora 10 ubicaciones diferentes",
      icon: <Target className="w-6 h-6 text-green-600" />,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
    },
    {
      id: 3,
      title: "Maestro Explorador",
      description: "Alcanza el nivel 15",
      icon: <Crown className="w-6 h-6 text-green-600" />,
      unlocked: false,
      progress: 12,
      maxProgress: 15,
    },
    {
      id: 4,
      title: "Racha Imparable",
      description: "Mantén una racha de 30 días",
      icon: <Flame className="w-6 h-6 text-green-600" />,
      unlocked: false,
      progress: 7,
      maxProgress: 30,
    },
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Exploración Diaria",
      description: "Completa 3 exploraciones hoy",
      reward: 100,
      deadline: "24h",
      completed: false,
    },
    {
      id: 2,
      title: "Coleccionista",
      description: "Encuentra 5 elementos únicos",
      reward: 250,
      deadline: "3 días",
      completed: true,
    },
    {
      id: 3,
      title: "Aventura Extrema",
      description: "Completa una exploración de nivel avanzado",
      reward: 500,
      deadline: "1 semana",
      completed: false,
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Aventurero", level: 25, xp: 15420 },
    { rank: 2, name: "Luna Exploradora", level: 23, xp: 13850 },
    { rank: 3, name: "Tú", level: userLevel, xp: userXP },
    { rank: 4, name: "Max Discovery", level: 11, xp: 2100 },
    { rank: 5, name: "Sara Quest", level: 10, xp: 1950 },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header Stats */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Level Card */}
            <Card className="bg-white border border-green-200 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-700">Nivel {userLevel}</h3>
                <Progress value={(userXP / nextLevelXP) * 100} className="mt-2" />
                <p className="text-sm text-gray-600 mt-1">
                  {userXP} / {nextLevelXP} XP
                </p>
              </CardContent>
            </Card>

            {/* Coins Card */}
            <Card className="bg-white border border-yellow-300 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-600">{userCoins}</h3>
                <p className="text-sm text-gray-600">Monedas de Oro</p>
              </CardContent>
            </Card>

            {/* Streak Card */}
            <Card className="bg-white border border-red-200 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-600">{streakDays}</h3>
                <p className="text-sm text-gray-600">Días de Racha</p>
              </CardContent>
            </Card>

            {/* Achievements Count */}
            <Card className="bg-white border border-blue-200 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </h3>
                <p className="text-sm text-gray-600">Logros</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Achievements */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-green-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Award className="w-6 h-6" />
                  Logros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border ${
                        achievement.unlocked
                          ? "bg-green-50 border-green-300"
                          : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-white border border-gray-200">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            {achievement.unlocked && (
                              <Badge className="bg-green-100 text-green-700 border border-green-300">
                                Desbloqueado
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {achievement.description}
                          </p>
                          {achievement.progress !== undefined && achievement.maxProgress && (
                            <div>
                              <Progress 
                                value={(achievement.progress / achievement.maxProgress) * 100} 
                                className="mb-1"
                              />
                              <p className="text-xs text-gray-500">
                                {achievement.progress} / {achievement.maxProgress}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card className="bg-white border border-yellow-200 shadow-md mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <Target className="w-6 h-6" />
                  Desafíos Diarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {challenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className={`p-4 rounded-lg border ${
                        challenge.completed
                          ? "bg-green-50 border-green-300"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-300">
                            +{challenge.reward} XP
                          </Badge>
                          {challenge.completed && (
                            <Badge className="bg-green-100 text-green-700 border border-green-300">
                              Completado
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Expira en: {challenge.deadline}
                        </span>
                        {!challenge.completed && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Iniciar Desafío
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <div>
            <Card className="bg-white border border-blue-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Medal className="w-6 h-6" />
                  Tabla de Líderes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        player.name === "Tú"
                          ? "bg-green-50 border border-green-300"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        player.rank === 1 ? "bg-yellow-400 text-white" :
                        player.rank === 2 ? "bg-gray-400 text-white" :
                        player.rank === 3 ? "bg-orange-500 text-white" :
                        "bg-gray-200 text-gray-800"
                      }`}>
                        {player.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{player.name}</p>
                        <p className="text-xs text-gray-600">
                          Nivel {player.level} • {player.xp.toLocaleString()} XP
                        </p>
                      </div>
                      {player.rank <= 3 && (
                        <Trophy className={`w-4 h-4 ${
                          player.rank === 1 ? "text-yellow-400" :
                          player.rank === 2 ? "text-gray-400" :
                          "text-orange-500"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rewards Store */}
            <Card className="bg-white border border-green-200 shadow-md mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Gift className="w-6 h-6" />
                  Tienda de Recompensas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div>
                      <p className="font-medium text-sm">Avatar Exclusivo</p>
                      <p className="text-xs text-gray-500">Marco dorado para tu perfil</p>
                    </div>
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs">
                      500 💰
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div>
                      <p className="font-medium text-sm">Boost de XP</p>
                      <p className="text-xs text-gray-500">2x XP por 24 horas</p>
                    </div>
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs">
                      300 💰
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div>
                      <p className="font-medium text-sm">Título Especial</p>
                      <p className="text-xs text-gray-500">"Explorador Legendario"</p>
                    </div>
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs">
                      1000 💰
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
