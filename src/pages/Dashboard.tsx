import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Lightbulb, Users, Target, BarChart3, PieChart } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          AI-Powered Market Intelligence
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your business decisions with real-time market insights and AI-generated strategies
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <Link to="/research" className="group">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Market Research</h2>
            </div>
            <p className="text-gray-600">
              Get comprehensive market analysis, competitor insights, and consumer behavior data in minutes
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                <span>SWOT Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <PieChart className="h-5 w-5 text-indigo-500" />
                <span>Market Trends</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/strategy" className="group">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <Lightbulb className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Strategy Generator</h2>
            </div>
            <p className="text-gray-600">
              Generate data-driven marketing strategies and actionable recommendations
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="h-5 w-5 text-indigo-500" />
                <span>Buyer Personas</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Target className="h-5 w-5 text-indigo-500" />
                <span>Sales Prospects</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;