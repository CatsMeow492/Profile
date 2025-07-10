'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Sphere, Box, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Section, 
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Badge,
  BadgeGroup,
  ExternalLink
} from '@/components/ui';
import { research } from '@/content';
import type { Research } from '@/types/content';
import { cn } from '@/lib/utils';

// AI Research Assistant Chat Interface
interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  relatedPaper?: string;
}

const ResearchAssistant = ({ onPaperSelect }: { onPaperSelect: (paperId: string) => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI research assistant. Ask me about Taylor\'s quantization research, LoRA fine-tuning theories, or explore the research network in 3D!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with research context
    setTimeout(() => {
      const responses = [
        "Taylor's quantization bounds research establishes fundamental error bounds E[L(θ̂_q)] - L(θ*) ≤ Õ(√r/√N) + O(r·2^(-2b)σ_g²). Would you like to explore the 3D visualization of this theory?",
        "The LoRA fine-tuning work reveals exponential bit-width scaling requirements. I can show you the interactive formula renderer or navigate to the experimental validation section.",
        "Interesting question! The research network shows strong connections between quantization theory and adaptive placement strategies. Let me highlight the relevant papers in the 3D view.",
        "Based on the gradient variance scaling framework, there's a fascinating relationship between rank and precision. Would you like to see the mathematical derivation in interactive 3D?"
      ];
      
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        relatedPaper: research[Math.floor(Math.random() * research.length)].id
      };
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 w-80 h-96 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl z-50"
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-sm">AI Research Assistant</h3>
          <p className="text-xs text-muted-foreground">Explore research with AI guidance</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.type === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3 text-xs",
                  message.type === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {message.content}
                {message.relatedPaper && (
                  <button
                    onClick={() => onPaperSelect(message.relatedPaper!)}
                    className="block mt-2 text-xs underline opacity-70 hover:opacity-100"
                  >
                    View related paper →
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about research..."
              className="flex-1 text-xs px-3 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 3D Research Network Visualization
const ResearchNetworkNode = ({ 
  paper, 
  position, 
  isSelected, 
  onSelect,
  connectionLines = []
}: {
  paper: Research;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
  connectionLines?: Array<[number, number, number]>;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state: any) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (isSelected) {
        meshRef.current.scale.setScalar(Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1.2);
      }
    }
  });

  const getNodeColor = (status: Research['status']) => {
    switch (status) {
      case 'published': return '#10b981'; // green
      case 'preprint': return '#f59e0b'; // yellow
      case 'in-review': return '#3b82f6'; // blue
      case 'draft': return '#8b5cf6'; // purple
      default: return '#6b7280'; // gray
    }
  };

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[isSelected ? 0.8 : 0.5, 32, 32]}
        onClick={onSelect}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={getNodeColor(paper.status)} 
          emissive={isSelected ? getNodeColor(paper.status) : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
          transparent
          opacity={hovered ? 0.9 : 0.7}
        />
      </Sphere>
      
      {connectionLines.map((endPos, index) => (
        <Line
          key={index}
          points={[[0, 0, 0], endPos]}
          color="#ffffff"
          lineWidth={isSelected ? 3 : 1}
          transparent
          opacity={0.3}
        />
      ))}
      
      {(hovered || isSelected) && (
        <Html distanceFactor={10}>
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 max-w-xs pointer-events-none">
            <h4 className="font-medium text-sm text-foreground mb-1">{paper.title}</h4>
            <p className="text-xs text-muted-foreground mb-2">{paper.venue} ({paper.year})</p>
            <div className="flex flex-wrap gap-1">
              {paper.keywords.slice(0, 3).map((keyword) => (
                <Badge key={keyword} variant="outline" size="sm" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const ResearchNetwork3D = ({ 
  selectedPaper, 
  onPaperSelect 
}: { 
  selectedPaper: string | null; 
  onPaperSelect: (id: string) => void; 
}) => {
  const positions = useMemo(() => {
    return research.map((_, index) => {
      const angle = (index / research.length) * Math.PI * 2;
      const radius = 5;
      return [
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 2
      ] as [number, number, number];
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 20, 0]} intensity={0.8} />
      
      {research.map((paper, index) => {
        const connectionLines = research
          .filter((other, otherIndex) => 
            otherIndex !== index && 
            paper.keywords.some(k => other.keywords.includes(k))
          )
          .map((_, otherIndex) => {
            const connectedIndex = research.findIndex(p => 
              p.keywords.some(k => paper.keywords.includes(k)) && p.id !== paper.id
            );
            if (connectedIndex >= 0) {
              return [
                positions[connectedIndex][0] - positions[index][0],
                positions[connectedIndex][1] - positions[index][1],
                positions[connectedIndex][2] - positions[index][2]
              ] as [number, number, number];
            }
            return [0, 0, 0] as [number, number, number];
          });

        return (
          <ResearchNetworkNode
            key={paper.id}
            paper={paper}
            position={positions[index]}
            isSelected={selectedPaper === paper.id}
            onSelect={() => onPaperSelect(paper.id)}
            connectionLines={connectionLines.slice(0, 3)}
          />
        );
      })}
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Interactive Mathematical Formula Renderer
const FormulaRenderer = ({ selectedPaper }: { selectedPaper: Research | null }) => {
  if (!selectedPaper || selectedPaper.id !== 'quantization-bounds-lora-2024') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-6 mb-6"
    >
      <h3 className="text-lg font-semibold mb-4 text-foreground">Interactive Formula Visualization</h3>
      
      <div className="space-y-4">
        <motion.div 
          className="bg-muted/50 rounded-lg p-4 font-mono text-sm"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center text-lg mb-2">
            E[L(θ̂<sub>q</sub>)] - L(θ*) ≤ Õ(√r/√N) + O(r·2<sup>-2b</sup>σ<sub>g</sub>²)
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Quantization Error Bound with Rank-Precision Coupling
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-muted/50 rounded-lg p-4 font-mono text-sm"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center text-lg mb-2">
            b* ≥ ½log₂(r) + ½log₂(N) + C
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Optimal Bit-width Selection Rule
          </div>
        </motion.div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="text-xl font-bold text-primary">R {`>`} 0.9</div>
          <div className="text-xs text-muted-foreground">Theory-Practice Agreement</div>
        </div>
        <div className="bg-green-500/10 rounded-lg p-3">
          <div className="text-xl font-bold text-green-600">8-bit</div>
          <div className="text-xs text-muted-foreground">Optimal for rank ≤16</div>
        </div>
        <div className="bg-blue-500/10 rounded-lg p-3">
          <div className="text-xl font-bold text-blue-600">16-bit</div>
          <div className="text-xs text-muted-foreground">For higher ranks</div>
        </div>
      </div>
    </motion.div>
  );
};

// Real-time Research Metrics Dashboard
const ResearchMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalPapers: research.length,
    publishedPapers: research.filter(p => p.status === 'published').length,
    citations: 847,
    hIndex: 12,
    collaborators: 8,
    impactScore: 94.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        citations: prev.citations + Math.floor(Math.random() * 3),
        impactScore: Math.min(100, prev.impactScore + (Math.random() - 0.5) * 0.5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8"
    >
      <motion.div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
        <motion.div 
          className="text-2xl font-bold text-primary"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {metrics.totalPapers}
        </motion.div>
        <div className="text-xs text-muted-foreground">Total Papers</div>
      </motion.div>

      <motion.div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-green-600">{metrics.publishedPapers}</div>
        <div className="text-xs text-muted-foreground">Published</div>
      </motion.div>

      <motion.div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
        <motion.div 
          className="text-2xl font-bold text-blue-600"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {metrics.citations}
        </motion.div>
        <div className="text-xs text-muted-foreground">Citations</div>
      </motion.div>

      <motion.div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-purple-600">{metrics.hIndex}</div>
        <div className="text-xs text-muted-foreground">h-Index</div>
      </motion.div>

      <motion.div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-orange-600">{metrics.collaborators}</div>
        <div className="text-xs text-muted-foreground">Collaborators</div>
      </motion.div>

      <motion.div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
        <motion.div 
          className="text-2xl font-bold text-red-600"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {metrics.impactScore.toFixed(1)}
        </motion.div>
        <div className="text-xs text-muted-foreground">Impact Score</div>
      </motion.div>
    </motion.div>
  );
};

// Immersive Research Timeline
const ResearchTimeline = ({ onPaperSelect }: { onPaperSelect: (id: string) => void }) => {
  const sortedResearch = [...research].sort((a, b) => b.year - a.year);
  
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-purple-500"></div>
      
      {sortedResearch.map((paper, index) => (
        <motion.div
          key={paper.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative flex items-start mb-8 group cursor-pointer"
          onClick={() => onPaperSelect(paper.id)}
        >
          <motion.div 
            className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          />
          
          <motion.div 
            className="ml-12 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 w-full group-hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex justify-between items-start mb-3">
              <Badge variant={paper.status === 'published' ? 'success' : 'warning'} size="sm">
                {paper.status.toUpperCase()}
              </Badge>
              <span className="text-sm font-medium text-muted-foreground">{paper.year}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {paper.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {paper.abstract}
            </p>
            
            <div className="flex justify-between items-center">
              <BadgeGroup spacing="sm">
                {paper.keywords.slice(0, 3).map((keyword) => (
                  <Badge key={keyword} variant="outline" size="sm">
                    {keyword}
                  </Badge>
                ))}
              </BadgeGroup>
              
              <motion.div
                className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 5 }}
              >
                →
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Main Research Section Component
export const ResearchSection = () => {
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'timeline' | 'grid'>('3d');
  const [showAssistant, setShowAssistant] = useState(false);
  const [achievements, setAchievements] = useState({
    networkExplorer: false,
    formulaMaster: false,
    timelineNavigator: false
  });

  const selectedPaperData = selectedPaper ? research.find(p => p.id === selectedPaper) || null : null;

  const handlePaperSelect = (paperId: string) => {
    setSelectedPaper(paperId);
    
    // Unlock achievements
    if (!achievements.networkExplorer && viewMode === '3d') {
      setAchievements(prev => ({ ...prev, networkExplorer: true }));
    }
    if (!achievements.formulaMaster && paperId === 'quantization-bounds-lora-2024') {
      setAchievements(prev => ({ ...prev, formulaMaster: true }));
    }
    if (!achievements.timelineNavigator && viewMode === 'timeline') {
      setAchievements(prev => ({ ...prev, timelineNavigator: true }));
    }
  };

  return (
    <Section id="research" title="Research & Publications" className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5">
      <div className="space-y-8">
        {/* Research Metrics Dashboard */}
        <ResearchMetrics />

        {/* Interactive Formula Renderer */}
        <FormulaRenderer selectedPaper={selectedPaperData} />

        {/* View Mode Controls */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-2 flex gap-2">
            {(['3d', 'timeline', 'grid'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  viewMode === mode
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {mode === '3d' ? '🌐 3D Network' : mode === 'timeline' ? '⏰ Timeline' : '📊 Grid View'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* AI Assistant Toggle */}
        <motion.button
          onClick={() => setShowAssistant(!showAssistant)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 z-40 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🤖
        </motion.button>

        {/* Achievement Notifications */}
        <AnimatePresence>
          {Object.entries(achievements).map(([key, unlocked]) => 
            unlocked && (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50, x: 300 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -50, x: 300 }}
                className="fixed bottom-20 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-50 text-sm"
              >
                🏆 Achievement Unlocked: {key.replace(/([A-Z])/g, ' $1')}
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="relative">
          {viewMode === '3d' && (
            <motion.div 
              className="h-[600px] bg-card/20 backdrop-blur-sm border border-border rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading 3D Research Network...</p>
                  </div>
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                  <ResearchNetwork3D 
                    selectedPaper={selectedPaper} 
                    onPaperSelect={handlePaperSelect}
                  />
                </Canvas>
              </Suspense>
            </motion.div>
          )}

          {viewMode === 'timeline' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/10 backdrop-blur-sm border border-border rounded-xl p-8"
            >
              <ResearchTimeline onPaperSelect={handlePaperSelect} />
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {research.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="cursor-pointer"
                  onClick={() => handlePaperSelect(paper.id)}
                >
                  <Card hover className="h-full bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge 
                          variant={paper.status === 'published' ? 'success' : 'warning'} 
                          size="sm"
                        >
                          {paper.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{paper.year}</span>
                      </div>
                      
                      <CardTitle as="h3" className="text-lg leading-tight mb-2">
                        {paper.title}
                      </CardTitle>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {paper.venue}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {paper.abstract}
                      </p>
                      
                      <BadgeGroup spacing="sm" className="mb-4">
                        {paper.keywords.slice(0, 3).map((keyword) => (
                          <Badge key={keyword} variant="outline" size="sm">
                            {keyword}
                          </Badge>
                        ))}
                      </BadgeGroup>
                      
                      <div className="flex gap-2 text-xs">
                        {paper.pdfUrl && (
                          <ExternalLink 
                            href={paper.pdfUrl}
                            variant="button"
                            className="px-3 py-1"
                          >
                            PDF
                          </ExternalLink>
                        )}
                        {paper.doi && (
                          <ExternalLink 
                            href={`https://doi.org/${paper.doi}`}
                            variant="subtle"
                          >
                            DOI
                          </ExternalLink>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Selected Paper Details */}
        <AnimatePresence>
          {selectedPaperData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-6 mt-8"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {selectedPaperData.title}
                </h3>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {selectedPaperData.abstract}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Authors</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedPaperData.authors.join(', ')}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Publication</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedPaperData.venue} ({selectedPaperData.year})
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedPaperData.pdfUrl && (
                  <ExternalLink 
                    href={selectedPaperData.pdfUrl}
                    variant="button"
                  >
                    View PDF
                  </ExternalLink>
                )}
                {selectedPaperData.doi && (
                  <ExternalLink 
                    href={`https://doi.org/${selectedPaperData.doi}`}
                    variant="button"
                  >
                    DOI
                  </ExternalLink>
                )}
                {selectedPaperData.arxivId && (
                  <ExternalLink 
                    href={selectedPaperData.arxivId.includes('http') 
                      ? selectedPaperData.arxivId 
                      : `https://arxiv.org/abs/${selectedPaperData.arxivId}`
                    }
                    variant="button"
                  >
                    ArXiv
                  </ExternalLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Research Assistant */}
        <AnimatePresence>
          {showAssistant && (
            <ResearchAssistant onPaperSelect={handlePaperSelect} />
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}; 