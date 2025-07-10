'use client';

import { useState } from 'react';
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

interface ResearchCardProps {
  paper: Research;
}

const ResearchCard = ({ paper }: ResearchCardProps) => {
  const [showFullAbstract, setShowFullAbstract] = useState(false);
  
  // Truncate abstract for initial display
  const maxAbstractLength = 300;
  const truncatedAbstract = paper.abstract.length > maxAbstractLength 
    ? paper.abstract.substring(0, maxAbstractLength) + '...'
    : paper.abstract;

  const getStatusBadgeVariant = (status: Research['status']) => {
    switch (status) {
      case 'published': return 'success';
      case 'preprint': return 'warning';
      case 'in-review': return 'accent';
      case 'draft': return 'outline';
      default: return 'secondary';
    }
  };

  const getCategoryBadgeVariant = (category: Research['category']) => {
    switch (category) {
      case 'quantization': return 'default';
      case 'optimization': return 'accent';
      case 'machine-learning': return 'secondary';
      case 'theory': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card hover className="h-full">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <Badge variant={getStatusBadgeVariant(paper.status)} size="sm">
            {paper.status.replace('-', ' ').toUpperCase()}
          </Badge>
          <Badge variant={getCategoryBadgeVariant(paper.category)} size="sm">
            {paper.category.replace('-', ' ')}
          </Badge>
        </div>
        
        <CardTitle as="h3" className="text-xl leading-tight mb-2">
          {paper.title}
        </CardTitle>
        
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            <strong>Authors:</strong> {paper.authors.join(', ')}
          </p>
          <p>
            <strong>Venue:</strong> {paper.venue} ({paper.year})
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Abstract */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Abstract</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {showFullAbstract ? paper.abstract : truncatedAbstract}
            </p>
            {paper.abstract.length > maxAbstractLength && (
              <button
                onClick={() => setShowFullAbstract(!showFullAbstract)}
                className="text-sm text-primary hover:text-primary/80 mt-2 transition-colors"
              >
                {showFullAbstract ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Keywords */}
          {paper.keywords.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Keywords</h4>
              <BadgeGroup spacing="sm">
                {paper.keywords.map((keyword) => (
                  <Badge key={keyword} variant="outline" size="sm">
                    {keyword}
                  </Badge>
                ))}
              </BadgeGroup>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
            {paper.pdfUrl && (
              <ExternalLink 
                href={paper.pdfUrl}
                variant="button"
                className="text-xs px-3 py-1"
              >
                {paper.pdfUrl.includes('github.com') ? 'View on GitHub' : 'Download PDF'}
              </ExternalLink>
            )}
            
            {paper.doi && (
              <ExternalLink 
                href={`https://doi.org/${paper.doi}`}
                variant="subtle"
                className="text-xs"
              >
                DOI: {paper.doi}
              </ExternalLink>
            )}
            
            {paper.arxivId && (
              <ExternalLink 
                href={paper.arxivId.includes('http') 
                  ? paper.arxivId 
                  : `https://arxiv.org/abs/${paper.arxivId}`
                }
                variant="subtle"
                className="text-xs"
              >
                {paper.arxivId.includes('http') ? 'GitHub' : `arXiv:${paper.arxivId}`}
              </ExternalLink>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => onCategoryChange('all')}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          selectedCategory === 'all'
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        )}
      >
        All Research
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize',
            selectedCategory === category
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {category.replace('-', ' ')}
        </button>
      ))}
    </div>
  );
};

export const ResearchSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get unique categories
  const categories = Array.from(new Set(research.map(paper => paper.category)));
  
  // Filter research by category
  const filteredResearch = selectedCategory === 'all' 
    ? research 
    : research.filter(paper => paper.category === selectedCategory);

  // Group by status for better organization
  const publishedPapers = filteredResearch.filter(paper => paper.status === 'published');
  const preprintPapers = filteredResearch.filter(paper => paper.status === 'preprint');
  const draftPapers = filteredResearch.filter(paper => paper.status === 'draft');
  const inReviewPapers = filteredResearch.filter(paper => paper.status === 'in-review');

  return (
    <Section
      id="research"
      title="Research & Publications"
      description="My academic research focusing on neural network quantization, parameter-efficient fine-tuning, and optimization techniques for large language models."
    >
      {/* Category Filter */}
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Research Papers */}
      <div className="space-y-12">
        {/* Published Papers */}
        {publishedPapers.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Published Research
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {publishedPapers.map((paper) => (
                <ResearchCard key={paper.id} paper={paper} />
              ))}
            </div>
          </div>
        )}

        {/* Preprints */}
        {preprintPapers.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Preprints & Working Papers
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {preprintPapers.map((paper) => (
                <ResearchCard key={paper.id} paper={paper} />
              ))}
            </div>
          </div>
        )}

        {/* Drafts */}
        {draftPapers.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Research in Progress
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {draftPapers.map((paper) => (
                <ResearchCard key={paper.id} paper={paper} />
              ))}
            </div>
          </div>
        )}

        {/* In Review */}
        {inReviewPapers.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Under Review
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inReviewPapers.map((paper) => (
                <ResearchCard key={paper.id} paper={paper} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Research Summary */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {research.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Publications
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {publishedPapers.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Published Papers
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {categories.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Research Areas
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {new Date().getFullYear() - Math.min(...research.map(p => p.year))}+
            </div>
            <div className="text-sm text-muted-foreground">
              Years Active
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}; 