'use client';

import { 
  Section, 
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Badge,
  BadgeGroup,
  ExternalLink
} from '@/components/ui';
import { certifications } from '@/content';
import type { Certification } from '@/types/content';

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard = ({ certification }: CertificationCardProps) => {
  const isExpired = certification.expiryDate 
    ? new Date(certification.expiryDate) < new Date()
    : false;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getExpiryStatus = () => {
    if (!certification.expiryDate) return null;
    
    const expiryDate = new Date(certification.expiryDate);
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);

    if (expiryDate < now) {
      return { status: 'expired', variant: 'error' as const, text: 'Expired' };
    } else if (expiryDate < sixMonthsFromNow) {
      return { status: 'expiring', variant: 'warning' as const, text: 'Expiring Soon' };
    } else {
      return { status: 'active', variant: 'success' as const, text: 'Active' };
    }
  };

  const expiryStatus = getExpiryStatus();

  return (
    <Card hover className={`h-full ${isExpired ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          {expiryStatus && (
            <Badge variant={expiryStatus.variant} size="sm">
              {expiryStatus.text}
            </Badge>
          )}
          {certification.badgeUrl && (
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/20 rounded"></div>
            </div>
          )}
        </div>
        
        <CardTitle as="h3" className="text-lg leading-tight">
          {certification.name}
        </CardTitle>
        
        <CardDescription>
          <strong>Issued by:</strong> {certification.issuer}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {certification.description}
          </p>

          {/* Issue and Expiry Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium text-foreground">Issued:</span>{' '}
              <span className="text-muted-foreground">
                {formatDate(certification.issueDate)}
              </span>
            </div>
            {certification.expiryDate && (
              <div>
                <span className="font-medium text-foreground">Expires:</span>{' '}
                <span className={`${isExpired ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {formatDate(certification.expiryDate)}
                </span>
              </div>
            )}
          </div>

          {/* Credential ID */}
          {certification.credentialId && (
            <div className="text-sm">
              <span className="font-medium text-foreground">ID:</span>{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                {certification.credentialId}
              </code>
            </div>
          )}

          {/* Skills */}
          {certification.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Skills Validated</h4>
              <BadgeGroup spacing="sm">
                {certification.skills.map((skill) => (
                  <Badge key={skill} variant="outline" size="sm">
                    {skill}
                  </Badge>
                ))}
              </BadgeGroup>
            </div>
          )}

          {/* Verification Link */}
          {certification.verificationUrl && (
            <div className="pt-2 border-t border-border">
              <ExternalLink 
                href={certification.verificationUrl}
                variant="button"
                className="text-xs px-3 py-2 w-full justify-center"
              >
                Verify Credential
              </ExternalLink>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface CertificationStatsProps {
  certifications: Certification[];
}

const CertificationStats = ({ certifications }: CertificationStatsProps) => {
  const activeCertifications = certifications.filter(cert => {
    if (!cert.expiryDate) return true;
    return new Date(cert.expiryDate) > new Date();
  });

  const uniqueIssuers = new Set(certifications.map(cert => cert.issuer));
  const allSkills = new Set(certifications.flatMap(cert => cert.skills));

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {certifications.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Total Certifications
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {activeCertifications.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Currently Active
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {uniqueIssuers.size}
          </div>
          <div className="text-sm text-muted-foreground">
            Certification Bodies
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {allSkills.size}
          </div>
          <div className="text-sm text-muted-foreground">
            Skills Validated
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const CertificationsSection = () => {
  // Sort certifications: active first, then by issue date (newest first)
  const sortedCertifications = [...certifications].sort((a, b) => {
    // First sort by active status
    const aActive = !a.expiryDate || new Date(a.expiryDate) > new Date();
    const bActive = !b.expiryDate || new Date(b.expiryDate) > new Date();
    
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    
    // Then sort by issue date (newest first)
    return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
  });

  return (
    <Section
      id="certifications"
      title="Professional Certifications"
      description="Industry-recognized certifications demonstrating expertise in cloud computing, machine learning, and software development practices."
      className="bg-muted/30"
    >
      {/* Statistics */}
      <CertificationStats certifications={certifications} />

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {sortedCertifications.map((certification) => (
          <CertificationCard key={certification.id} certification={certification} />
        ))}
      </div>

      {/* Note about verification */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          All certifications can be independently verified through the provided links. 
          Active certifications are kept current through continuous professional development 
          and renewal requirements.
        </p>
      </div>
    </Section>
  );
}; 