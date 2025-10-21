/**
 * Analytics Event Tracking SDK
 * 100% FREE - tracks events to Supabase
 */

// Event types that can be tracked
export type EventType =
  | 'signup_submitted'
  | 'onboarding_completed'
  | 'intent_declared'
  | 'template_selected'
  | 'section_edited'
  | 'image_uploaded'
  | 'publish_clicked'
  | 'site_published'
  | 'integration_connected_crm'
  | 'integration_connected_pos'
  | 'integration_connected_payments'
  | 'integration_connected_booking'
  | 'checkout_started'
  | 'checkout_completed'
  | 'subscription_upgraded'
  | 'subscription_downgraded'
  | 'churned'
  | 'support_contacted'
  | 'ai_tool_used'
  | 'ai_generation_completed'
  | 'ai_generation_started'
  | 'ai_generation_error'
  | 'page_viewed'
  | 'feature_clicked';

interface EventPayload {
  [key: string]: any;
}

interface TrackEventParams {
  eventType: EventType;
  payload?: EventPayload;
  userId?: string;
}

/**
 * Get device class (mobile, desktop, tablet)
 */
function getDeviceClass(): string {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Get browser info
 */
function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = 'unknown';
  
  if (ua.includes('Chrome')) browser = 'chrome';
  else if (ua.includes('Safari')) browser = 'safari';
  else if (ua.includes('Firefox')) browser = 'firefox';
  else if (ua.includes('Edge')) browser = 'edge';
  
  return browser;
}

/**
 * Get OS info
 */
function getOSInfo() {
  const ua = navigator.userAgent;
  let os = 'unknown';
  
  if (ua.includes('Windows')) os = 'windows';
  else if (ua.includes('Mac')) os = 'macos';
  else if (ua.includes('Linux')) os = 'linux';
  else if (ua.includes('Android')) os = 'android';
  else if (ua.includes('iOS')) os = 'ios';
  
  return os;
}

/**
 * Get UTM parameters from URL
 */
function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
  };
}

/**
 * Generate or get session ID
 */
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

/**
 * Track an event
 */
export async function trackEvent({
  eventType,
  payload = {},
  userId,
}: TrackEventParams): Promise<boolean> {
  try {
    const eventData = {
      user_id: userId,
      event_type: eventType,
      ts: new Date().toISOString(),
      session_id: getSessionId(),
      page: window.location.pathname,
      ...getUTMParams(),
      device_class: getDeviceClass(),
      device_os: getOSInfo(),
      device_browser: getBrowserInfo(),
      payload,
    };

    // Send to API
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    return response.ok;
  } catch (error) {
    console.error('Error tracking event:', error);
    return false;
  }
}

/**
 * Track page view
 */
export function trackPageView(userId?: string) {
  trackEvent({
    eventType: 'page_viewed',
    payload: {
      path: window.location.pathname,
      referrer: document.referrer,
    },
    userId,
  });
}

/**
 * Track AI generation
 */
export function trackAIGeneration(
  appName: string,
  success: boolean,
  generationTimeMs: number,
  userId?: string
) {
  trackEvent({
    eventType: success ? 'ai_generation_completed' : 'ai_generation_error',
    payload: {
      app_name: appName,
      generation_time_ms: generationTimeMs,
      success,
    },
    userId,
  });
}

/**
 * Track feature usage
 */
export function trackFeature(
  featureName: string,
  action: string = 'clicked',
  userId?: string
) {
  trackEvent({
    eventType: 'feature_clicked',
    payload: {
      feature: featureName,
      action,
    },
    userId,
  });
}

/**
 * Initialize analytics (call on app load)
 */
export function initAnalytics(userId?: string) {
  // Track initial page view
  trackPageView(userId);

  // Track page changes (for SPA)
  let lastPath = window.location.pathname;
  setInterval(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== lastPath) {
      trackPageView(userId);
      lastPath = currentPath;
    }
  }, 1000);
}
