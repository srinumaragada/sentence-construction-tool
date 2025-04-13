import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Clock, ListChecks, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";



export const Homepage = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl" 
      >
        <Card className="w-full mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border-0 relative">
         
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
          </div>
          
          <CardHeader className="space-y-4 px-8 pt-8 pb-6 relative z-10">
            <div className="flex justify-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Sentence Construction
            </h1>
            <p className="text-center text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Select the correct words to complete the sentence by arranging the provided options in the right order.
            </p>
          </CardHeader>

          <div className="border-t border-gray-200 mx-8 opacity-50" />

          <CardContent className="px-8 py-6 relative z-10">
            <div className="grid grid-cols-3 gap-5">
              <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-700 text-sm">
                  Time Per Question
                </h3>
                <p className="text-blue-600 font-medium mt-2 text-lg">
                  30 sec
                </p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                  <ListChecks className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-700 text-sm">
                  Total Questions
                </h3>
                <p className="text-purple-600 font-medium mt-2 text-lg">
                  10
                </p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-amber-50 to-white rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
                  <Coins className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-700 text-sm">
                  Coins
                </h3>
                <p className="text-amber-600 font-medium mt-2 text-lg flex items-center justify-center gap-1">
                  <Sparkles className="h-4 w-4" /> 0
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center px-8 py-6 bg-gray-50/50 backdrop-blur-sm border-t border-gray-100/50">
           
            <Button 
            onClick={()=> navigate("/quizpage")}
              className="px-8 py-3 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-[1.02] hover:shadow-lg shadow-blue-200/50"
            >
              Start Challenge
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};