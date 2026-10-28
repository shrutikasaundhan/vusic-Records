// Standalone Client-Side API Layer (Zero Backend Dependency)
// Uses LocalStorage for persistent, instantaneous operations

const DEMO_USER = {
  id: 'usr_demo_882',
  name: 'Aaryan Sharma',
  email: 'artist@vusicrecords.com',
  artistOrLabelName: 'Aaryan Sharma Studio',
  role: 'artist',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  bankDetails: {
    accountHolderName: 'Aaryan Sharma',
    accountNumber: '918237461928',
    ifscCode: 'HDFC0001234',
    bankName: 'HDFC Bank',
    upiId: 'aaryan@okhdfcbank'
  }
};

const SEED_CATALOG = [
  {
    _id: 'sample_shaan',
    title: 'Rangreza Re',
    primaryArtist: 'Aaryan Sharma feat. Shaan',
    genre: 'Bollywood / Acoustic Pop',
    language: 'Hindi',
    releaseDate: '2026-09-15',
    status: 'Delivered',
    coverArtUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    isrc: 'IN-VUS-26-48291',
    upc: '890128471928',
    totalStreams: 482930,
    earnings: 19840
  },
  {
    _id: 'sample_javed',
    title: 'Mehfil-E-Sufi',
    primaryArtist: 'Javed Ali',
    genre: 'Sufi & Qawwali',
    language: 'Urdu / Hindi',
    releaseDate: '2026-08-20',
    status: 'Delivered',
    coverArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=melody-of-nature-15682.mp3',
    isrc: 'IN-VUS-26-38294',
    upc: '890128471929',
    totalStreams: 138400,
    earnings: 5674
  },
  {
    _id: 'sample_jubin',
    title: 'Raataan Lambiyan (Reprise)',
    primaryArtist: 'Jubin Nautiyal',
    genre: 'Romantic Melody',
    language: 'Hindi',
    releaseDate: '2026-07-10',
    status: 'Delivered',
    coverArtUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    isrc: 'IN-VUS-26-82910',
    upc: '890128471930',
    totalStreams: 78200,
    earnings: 3118
  }
];

const getStoredReleases = () => {
  try {
    const raw = localStorage.getItem('vusic_releases');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(e);
  }
  return SEED_CATALOG;
};

const saveStoredReleases = (releases) => {
  try {
    localStorage.setItem('vusic_releases', JSON.stringify(releases));
  } catch (e) {
    console.warn(e);
  }
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('vusic_user');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(e);
  }
  return DEMO_USER;
};

const saveStoredUser = (user) => {
  try {
    localStorage.setItem('vusic_user', JSON.stringify(user));
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  // Auth Operations
  async register(userData) {
    const user = {
      id: 'usr_' + Date.now(),
      name: userData.name || 'New Artist',
      email: userData.email,
      artistOrLabelName: userData.artistOrLabelName || userData.name,
      role: userData.role || 'artist',
      bankDetails: {}
    };
    saveStoredUser(user);
    localStorage.setItem('vusic_token', 'token_' + Date.now());
    return { success: true, token: 'token_' + Date.now(), user };
  },

  async login(credentials) {
    let user = getStoredUser();
    if (credentials.email && credentials.email !== user.email) {
      user.email = credentials.email;
      user.name = credentials.email.split('@')[0];
      saveStoredUser(user);
    }
    const token = 'token_' + Date.now();
    localStorage.setItem('vusic_token', token);
    return { success: true, token, user };
  },

  async getProfile() {
    return { success: true, user: getStoredUser() };
  },

  async updateProfile(profileData) {
    const user = { ...getStoredUser(), ...profileData };
    saveStoredUser(user);
    return { success: true, user };
  },

  // Releases & Catalog
  async getCatalog() {
    return { success: true, catalog: getStoredReleases() };
  },

  async getMyReleases() {
    return { success: true, releases: getStoredReleases() };
  },

  async createRelease(releaseData) {
    const isrcNum = Math.floor(10000 + Math.random() * 90000);
    const upcNum = Math.floor(100000000 + Math.random() * 900000000);
    
    const newRelease = {
      _id: 'rel_' + Date.now(),
      title: releaseData.title,
      primaryArtist: releaseData.primaryArtist || getStoredUser().artistOrLabelName,
      genre: releaseData.genre || 'Pop',
      language: releaseData.language || 'Hindi',
      releaseDate: releaseData.releaseDate || new Date().toISOString().split('T')[0],
      status: 'Delivered',
      coverArtUrl: releaseData.coverArtUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
      audioUrl: releaseData.audioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
      isrc: `IN-VUS-26-${isrcNum}`,
      upc: `890${upcNum}`,
      storesSelected: releaseData.storesSelected || ['Spotify', 'JioSaavn', 'Airtel Hello Tunes', 'Apple Music'],
      callerTuneSet: releaseData.callerTuneSet !== false,
      youtubeContentId: releaseData.youtubeContentId !== false,
      totalStreams: 1240,
      earnings: 48
    };

    const currentReleases = getStoredReleases();
    const updated = [newRelease, ...currentReleases];
    saveStoredReleases(updated);

    return { success: true, release: newRelease };
  },

  async updateRelease(id, updateData) {
    const releases = getStoredReleases().map(r => r._id === id ? { ...r, ...updateData } : r);
    saveStoredReleases(releases);
    return { success: true, release: releases.find(r => r._id === id) };
  },

  async deleteRelease(id) {
    const releases = getStoredReleases().filter(r => r._id !== id);
    saveStoredReleases(releases);
    return { success: true, message: 'Release deleted successfully' };
  },

  // Analytics & Dashboard
  async getDashboardAnalytics() {
    const releases = getStoredReleases();
    const totalStreams = releases.reduce((sum, r) => sum + (r.totalStreams || 0), 0);
    const totalEarnings = releases.reduce((sum, r) => sum + (r.earnings || 0), 0);

    return {
      success: true,
      analytics: {
        totalStreams: totalStreams || 699530,
        totalEarnings: totalEarnings || 28632,
        activeReleases: releases.length,
        pendingTakedowns: 0,
        platformBreakdown: [
          { platform: 'Spotify', streams: Math.round(totalStreams * 0.44), share: '44%' },
          { platform: 'JioSaavn & Gaana', streams: Math.round(totalStreams * 0.31), share: '31%' },
          { platform: 'YouTube Content ID', streams: Math.round(totalStreams * 0.17), share: '17%' },
          { platform: 'Apple & Wynk', streams: Math.round(totalStreams * 0.08), share: '8%' }
        ]
      }
    };
  },

  // Royalties & Bank Payouts
  async getRoyalties() {
    return {
      success: true,
      royalties: {
        totalEarned: 28632,
        currentBalance: 14200,
        paidOut: 14432,
        pendingClearance: 4200,
        minimumPayout: 10,
        recentPayouts: [
          {
            _id: 'payout_001',
            amount: 14432,
            payoutMethod: 'Bank Transfer (IMPS)',
            status: 'Completed',
            transactionRef: 'VUSIC-TX-984210',
            date: '2026-10-15'
          }
        ]
      }
    };
  },

  async requestPayout(withdrawalData) {
    const amount = Number(withdrawalData.amount || 0);
    if (amount < 10) {
      throw new Error('Minimum withdrawal amount is ₹10');
    }
    return {
      success: true,
      message: `₹${amount.toLocaleString()} payout requested successfully. Funds will arrive within 24 hours.`
    };
  },

  // Plans
  async getPlans() {
    return {
      success: true,
      plans: [
        { id: 'pay_per_release', name: 'Pay Per Release', price: 599 },
        { id: 'artist_unlimited', name: 'Artist Unlimited', price: 3999 },
        { id: 'pro_label', name: 'PRO Label', price: 5499 }
      ]
    };
  },

  // A&R Demo & Interview Pitch Submission
  async submitInquiry(inquiryData) {
    try {
      const stored = JSON.parse(localStorage.getItem('vusic_inquiries') || '[]');
      stored.unshift({ ...inquiryData, id: 'inq_' + Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('vusic_inquiries', JSON.stringify(stored));
    } catch (e) {
      console.warn(e);
    }

    return {
      success: true,
      message: 'Pitch submitted successfully! Our A&R team will review it within 24 hours.'
    };
  }
};
