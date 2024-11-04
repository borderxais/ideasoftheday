import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Target, Users, AlertCircle, Loader2, Hash, Calendar } from 'lucide-react';
import { useDailyIdeasStore } from '../../stores/dailyIdeasStore';

export function IdeationEngine() {
  const [formData, setFormData] = useState({
    productUrl: '',
    targetAudience: '',
    contentGoals: '',
    brandTone: 'casual',
    contentTypes: [] as string[],
    preferredLength: '15',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<any>(null);
  const { dailyIdeas, loading, error, fetchDailyIdeas } = useDailyIdeasStore();

  useEffect(() => {
    fetchDailyIdeas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/content/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedIdeas(data);
    } catch (error) {
      console.error('Error generating ideas:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6">
      {/* Ideas of the Day Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ideas of the Day</h2>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        ) : dailyIdeas && dailyIdeas.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {dailyIdeas.map((idea, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">{idea.title}</h3>
                <p className="text-gray-600 mb-4">{idea.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm">{idea.targetAudience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm">{idea.bestTimeToPost}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {idea.hashtags.map((tag, i) => (
                      <span key={i} className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No daily ideas available</p>
          </div>
        )}
      </div>

      {/* Generate Ideas Form */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-6">Generate Content Ideas</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product/Service URL
              </label>
              <input
                type="text"
                value={formData.productUrl}
                onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                placeholder="Enter product page URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g., Women 25-34 interested in skincare"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Goals
              </label>
              <textarea
                value={formData.contentGoals}
                onChange={(e) => setFormData({ ...formData, contentGoals: e.target.value })}
                placeholder="What do you want to achieve with this content?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Tone
                </label>
                <select
                  value={formData.brandTone}
                  onChange={(e) => setFormData({ ...formData, brandTone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="casual">Casual & Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="luxury">Luxury & Sophisticated</option>
                  <option value="playful">Playful & Fun</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Length
                </label>
                <select
                  value={formData.preferredLength}
                  onChange={(e) => setFormData({ ...formData, preferredLength: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="15">15 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">60 seconds</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Types
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Tutorial', 'Review', 'Behind the Scenes', 'Tips & Tricks'].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.contentTypes.includes(type)}
                      onChange={(e) => {
                        const types = e.target.checked
                          ? [...formData.contentTypes, type]
                          : formData.contentTypes.filter(t => t !== type);
                        setFormData({ ...formData, contentTypes: types });
                      }}
                      className="rounded text-indigo-600"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Ideas
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Ideas Display */}
        {generatedIdeas && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Content Recommendations</h2>
            <div className="grid gap-6">
              {generatedIdeas.contentBriefs?.map((brief: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{brief.title}</h3>
                  <p className="text-gray-600 mb-4">{brief.hook}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Points</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {brief.keyPoints.map((point: string, i: number) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {brief.recommendedHashtags.map((tag: string, i: number) => (
                        <span key={i} className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}