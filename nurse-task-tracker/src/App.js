import React, { useState, useEffect } from 'react';
import { Plus, Check, Star, Heart, Award, Trash2 } from 'lucide-react';

const NurseTaskTracker = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Check patient vitals", completed: false, priority: "high" },
    { id: 2, text: "Administer medications", completed: false, priority: "high" },
    { id: 3, text: "Update patient charts", completed: false, priority: "medium" },
    { id: 4, text: "Stock supply room", completed: false, priority: "low" }
  ]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [points, setPoints] = useState(150);
  const [showCelebration, setShowCelebration] = useState(false);
  const [earnedSticker, setEarnedSticker] = useState(null);

  const stickers = ['🏆', '⭐', '💖', '🌟', '🎉', '💪', '👏', '🌈', '💫', '🦋'];
  const motivationalMessages = [
    "You're doing amazing!",
    "Keep up the great work!",
    "You're a healthcare hero!",
    "Every task completed helps someone!",
    "You're making a difference!",
    "Fantastic job, nurse!",
    "Your care matters!"
  ];

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id && !task.completed) {
        const pointsEarned = task.priority === 'high' ? 20 : task.priority === 'medium' ? 15 : 10;
        setPoints(prev => prev + pointsEarned);
        setShowCelebration(true);
        setEarnedSticker(stickers[Math.floor(Math.random() * stickers.length)]);
        setTimeout(() => {
          setShowCelebration(false);
          setEarnedSticker(null);
        }, 2000);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-300 bg-red-50';
      case 'medium': return 'border-yellow-300 bg-yellow-50';
      case 'low': return 'border-green-300 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityEmoji = (priority) => {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-3 animate-bounce">
            <span className="text-2xl">👩‍⚕️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Nurse Task Tracker</h1>
          <p className="text-gray-600">You're doing amazing work! 💪</p>
        </div>

        {/* Points Display */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-6 h-6" />
              <span className="font-bold text-lg text-gray-800">{points} Points</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">{completedTasks}/{totalTasks} tasks</div>
              <div className="text-xs text-gray-500">completed today</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-center text-xs text-gray-500">
            {progressPercentage.toFixed(0)}% Complete
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-3 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex gap-2">
            <span className="text-sm text-gray-600 py-2">Priority:</span>
            {['high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  priority === p 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {getPriorityEmoji(p)} {p}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3 mb-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-2xl p-4 shadow-lg border-2 transition-all duration-300 ${
                task.completed 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 transform scale-98' 
                  : getPriorityColor(task.priority)
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
                    task.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {task.completed && <Check className="w-5 h-5" />}
                </button>
                
                <div className="flex-1">
                  <span
                    className={`${
                      task.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-800'
                    } transition-all duration-200`}
                  >
                    {task.text}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs">{getPriorityEmoji(task.priority)}</span>
                    <span className="text-xs text-gray-500 capitalize">{task.priority} priority</span>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Footer */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white text-center shadow-lg">
          <Heart className="w-6 h-6 mx-auto mb-2 animate-pulse" />
          <p className="font-medium">
            {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
          </p>
          <p className="text-sm opacity-90 mt-1">Keep spreading care and kindness! 🌟</p>
        </div>

        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-yellow-300 animate-bounce">
              <div className="text-center">
                <div className="text-4xl mb-2 animate-spin">{earnedSticker}</div>
                <div className="font-bold text-lg text-gray-800">Task Complete!</div>
                <div className="text-sm text-gray-600">+{tasks.find(t => t.completed)?.priority === 'high' ? '20' : tasks.find(t => t.completed)?.priority === 'medium' ? '15' : '10'} points!</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseTaskTracker;