export type Language = 'en' | 'es';

export type JourneyStage = 'darkness' | 'glimpse' | 'inner_light' | 'mastery' | 'illumination';

export type PractitionerSpecialty =
  | 'narrative_coaching'
  | 'mindfulness'
  | 'therapy'
  | 'life_coaching'
  | 'group_facilitation'
  | 'other';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  languagePreference: Language;
  journeyStage?: JourneyStage;
  avatarUrl?: string;
  isPractitioner?: boolean;
}

export interface PractitionerProfile {
  id: string;
  userId: string;
  name: string;
  bio?: string;
  bioEs?: string;
  languagesOffered: Language[];
  specialties: PractitionerSpecialty[];
  profileImageUrl?: string;
  contactEmail?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  availabilityStatus: 'available' | 'busy' | 'unavailable';
  timezone?: string;
  isApproved: boolean;
}

export interface Testimonial {
  id: string;
  practitionerId: string;
  text: string;
  authorName: string;
  rating: number;
  language: Language;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface GatedResource {
  id: string;
  title: string;
  titleEs?: string;
  description?: string;
  descriptionEs?: string;
  s3FilePath: string;
  language: Language | 'both';
  resourceType: 'pdf' | 'audio' | 'quiz' | 'worksheet' | 'workbook';
  isActive: boolean;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  fullName?: string;
  language: Language;
  status: 'active' | 'unsubscribed' | 'bounced';
  journeyStage?: JourneyStage;
  tags?: string[];
  leadSource?: string;
}
