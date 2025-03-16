import { EventBus, Events } from './event-bus';

// Add type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Category interface for consent categories
 */
export interface ConsentCategory {
  id: string;
  isChecked?: boolean;
  isRequired?: boolean;
}

/**
 * Preferences interface for consent preferences
 */
export interface ConsentPreferences {
  [key: string]: boolean;
}

/**
 * Options for the ConsentManager
 */
export interface ConsentManagerOptions {
  categories: ConsentCategory[];
  eventBus: EventBus;
}

/**
 * Manages cookie consent preferences and Google Consent Mode integration
 */
export class ConsentManager {
  private preferences: ConsentPreferences = {};
  private eventBus: EventBus;

  constructor(options: ConsentManagerOptions) {
    this.eventBus = options.eventBus;
    this.init(options.categories);
  }

  /**
   * Initialize the consent manager with categories
   */
  init(categories: ConsentCategory[]): void {
    // Initialize preferences based on provided categories
    this.preferences = categories.reduce(
      (acc: ConsentPreferences, category) => {
        acc[category.id] = category.isChecked || category.isRequired || false;
        return acc;
      },
      {},
    );

    // Listen for preference changes
    this.eventBus.subscribe(
      Events.CONSENT_UPDATED,
      (newPreferences: ConsentPreferences) => {
        this.updatePreferences(newPreferences);
      },
    );
  }

  /**
   * Update consent preferences
   */
  updatePreferences(newPreferences: ConsentPreferences): void {
    const preferences = {
      ...this.preferences,
      ...newPreferences,
    };

    this.updateGoogleConsent(preferences);

    // Store in cookies/localStorage if needed
    this.savePreferences(preferences);
  }

  /**
   * Update Google Consent Mode settings
   */
  private updateGoogleConsent(preferences: ConsentPreferences): void {
    // Google Consent Mode v2 integration using gtag
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: preferences.targeting ? 'granted' : 'denied',
        analytics_storage: preferences.performance ? 'granted' : 'denied',
        functionality_storage: preferences.functionality ? 'granted' : 'denied',
        personalization_storage: preferences.functionality
          ? 'granted'
          : 'denied',
        security_storage: 'granted', // Always granted as it's necessary
      });
    } else {
      console.warn('Google tag (gtag.js) not loaded or available');
    }
  }

  /**
   * Save preferences to localStorage
   */
  private savePreferences(preferences: ConsentPreferences): void {
    try {
      localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save preferences', e);
    }
  }

  /**
   * Load preferences from localStorage
   */
  loadPreferences(): ConsentPreferences | null {
    try {
      const saved = localStorage.getItem('cookiePreferences');

      if (saved) {
        this.preferences = JSON.parse(saved);
        return this.preferences;
      }
    } catch (e) {
      console.error('Failed to load preferences', e);
    }

    return null;
  }

  /**
   * Accept all consent categories
   * Triggers the CONSENT_ALL_ACCEPTED event
   */
  acceptAll(categories: ConsentCategory[]): ConsentPreferences {
    const allAccepted = categories.reduce(
      (acc: ConsentPreferences, category) => {
        acc[category.id] = true;
        return acc;
      },
      {},
    );

    this.updatePreferences(allAccepted);
    this.eventBus.publish(Events.CONSENT_ALL_ACCEPTED, allAccepted);
    return allAccepted;
  }
}
