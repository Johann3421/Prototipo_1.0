/**
 * trackEvent — fire-and-forget analytics helper.
 * Never blocks the UI. Errors are silently swallowed to avoid
 * breaking the user experience if the tracking endpoint is down.
 */
export type TrackEventType =
  | 'DEMO_CLICK'
  | 'WHATSAPP_CLICK'
  | 'PRICING_VIEW'
  | 'FORM_SUBMIT'
  | 'PAGE_VIEW';

export function trackEvent(
  eventType: TrackEventType,
  target: string,
  metadata?: Record<string, unknown>
): void {
  // Fire-and-forget: no await, never blocks onClick
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventType, target, metadata }),
  }).catch(() => {
    // Silently swallow — analytics must never break UX
  });
}
