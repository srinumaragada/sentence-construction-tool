import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

function ResultsDisplay({ score, questions, answers }: any) {
  const navigate = useNavigate();
  const percentage = (score / questions.length) * 100;
  const scoreColor = percentage >= 80 ? 'text-emerald-500' : 
                    percentage >= 50 ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-violet-50 to-violet-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-blue-100"
      >
        <Card className="p-6 md:p-8 shadow-lg rounded-xl">
         
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Quiz Results
            </motion.h2>
            
            <div className="flex flex-col items-center">
              <div className={`text-5xl font-bold ${scoreColor} mb-2`}>
                {score}<span className="text-gray-400">/{questions.length}</span>
              </div>
              
              <Progress 
                value={percentage} 
                className="h-3 w-full max-w-xs mt-4 [&>*]:bg-gradient-to-r [&>*]:from-indigo-500 [&>*]:to-purple-500" 
              />
              
              <motion.div whileHover={{ scale: 1.03 }} className="mt-6">
                <Button 
                  size="lg"
                  className=" rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => navigate('/')}
                >
                  Return to Dashboard
                </Button>
              </motion.div>
            </div>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Question Breakdown:</h3>
            
            {answers.map((answer: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-5 rounded-lg border ${answer.correct ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`pt-1 ${answer.correct ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {answer.correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-2 mb-2">
                        <span className="font-medium text-gray-700">Question {index + 1}:</span>
                        <span className="text-sm text-gray-500">({questions[index]?.points || 1} point{questions[index]?.points !== 1 ? 's' : ''})</span>
                      </div>
                      
                      <p className="mb-3 text-gray-800">{answer.question}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className={`p-2 rounded ${answer.correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          <div className="font-medium">Your answer:</div>
                          <div>{answer.userAnswer.join(', ') || '(empty)'}</div>
                        </div>
                        
                        {!answer.correct && (
                          <div className="p-2 rounded bg-emerald-100 text-emerald-800">
                            <div className="font-medium">Correct answer:</div>
                            <div>{questions[index]?.correctAnswer?.join(', ')}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default ResultsDisplay;