import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  joined: false,
  setOptIn: vi.fn(),
}));
vi.mock('../lib/store', () => ({
  useAppStore: (selector: (state: Record<string, unknown>) => unknown) => selector({
    setOptIn: mocks.setOptIn,
    optInDisplayName: '',
    optInEmail: '',
    optInEnabled: mocks.joined,
  }),
}));

import { OptInModal } from './OptInModal';

beforeEach(() => {
  mocks.joined = false;
  vi.clearAllMocks();
});

describe('existing sharing modal (openjarvis-aman: leaderboard-only, no analytics)', () => {
  it('offers the leaderboard giveaway without any analytics actions', () => {
    const html = renderToStaticMarkup(<OptInModal onClose={vi.fn()} />);
    expect(html).not.toContain('type="checkbox"');
    expect(html).not.toContain('analytics');
    expect(html).not.toContain('PostHog');
    expect(html).toContain('Enter giveaway');
    expect(html).toContain('Continue without sharing');
    expect(html).toContain('Win a Mac mini');
    expect(html).toContain('Your name and savings are public');
    expect(mocks.setOptIn).not.toHaveBeenCalled();
  });

  it('allows existing leaderboard members to stop leaderboard updates', () => {
    mocks.joined = true;
    const html = renderToStaticMarkup(<OptInModal onClose={vi.fn()} />);
    expect(html).toContain('Leaderboard sharing enabled');
    expect(html).toContain('Stop leaderboard updates');
    expect(html).not.toContain('analytics');
  });
});
